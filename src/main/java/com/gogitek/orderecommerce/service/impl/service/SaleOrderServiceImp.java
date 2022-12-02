package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.common.constant.OrderType;
import com.gogitek.orderecommerce.common.constant.PaymentStatus;
import com.gogitek.orderecommerce.config.common.AutoGenerateCode;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.config.log.*;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.*;
import com.gogitek.orderecommerce.controller.dto.res.*;
import com.gogitek.orderecommerce.controller.service.CartService;
import com.gogitek.orderecommerce.controller.service.ChangeLogService;
import com.gogitek.orderecommerce.controller.service.SaleOrderService;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.entity.PropertySetting;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.service.cache.PropertyCache;
import com.gogitek.orderecommerce.service.mapper.OrderMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.util.CollectionUtils;

import java.lang.reflect.Type;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SaleOrderServiceImp extends GrossOrderService implements SaleOrderService {
    @Autowired
    SaleOrderDao saleOrderDao;
    @Autowired
    PlatformTransactionManager transactionManager;
    @Autowired
    CartService cartService;
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    PropertyCache cacheService;
    @Autowired
    AutoGenerateCode autoGenerateCode;
    @Autowired
    ChangeLogService changeLogService;

    private final Gson gson = new Gson();

    @Override
    public OrderRes createNewSaleOrder(SaleOrderInput input) {
        UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            LogDifferentBuilder builder = new LogDifferentBuilder();
            builder.setAction(LogAction.ADD);
            if (!userPresent.isEnabled()) throw new MultiLangException(ResultCodes.USER_NOT_LOGIN);
            User user = userPresent.getUser();

            SaleOrder order = new SaleOrder();
            String orderCode = autoGenerateCode.generate();
            PropertySetting setting = cacheService.getPresentSetting();
            order.setAddressId(input.getAddressDto().getAddressId());
            order.setAddress(input.getAddressDto().getAddress());

            double vatPercent = setting.getVatPercent();
            double finalPrice;
            double totalVat;

            CartRes cartRes = input.getInputData();
            double netPrice = cartRes.getTotalPriceVnd(); //Giá trước thuế

            totalVat = Math.ceil((netPrice * vatPercent) / 100);
            finalPrice = totalVat + netPrice - input.getVoucherPrice(); //Chưa áp voucher, bao giờ áp voucher thì tính

            order.setFinalPrice(finalPrice);
            order.setOrderType(OrderType.SALE_ORDER.getValue());
            order.setTotalVat(totalVat);
            order.setDiscount(input.getVoucherPrice());
            order.setTotalNetPrice(netPrice);
            order.setStatus(OrderStatus.PENDING.getValue());
//            order.setPaymentFee(setting.getShipFee());
            order.setPaymentStatus(PaymentStatus.PENDING.getValue());
            order.setPaymentMethodCode(PaymentStatus.PENDING.getValue());
            order.setOrderDate(Instant.now());
            order.setUpdatedAt(Instant.now());


            double totalPoint = 0;

            if (finalPrice >= 100000) totalPoint = 10000;
            else {
                totalPoint += finalPrice / 100;
            }
            order.setTotalPoint(Math.floor(totalPoint));

            //Set User Information
            order.setCustomerId(userPresent.getId());
            order.setCustomerName(user.getName());
            order.setCustomerPhone(user.getPhone());
            order.setCustomerEmail(user.getEmail());
            order.setOrderCode(orderCode);
            order.setDueDate(Instant.now().plus(3, ChronoUnit.DAYS));
            order.setPointUsedAmount(Double.valueOf(input.getPointInUsed()));
            order.setCustomerId(user.getId());

            if (input.getPointInUsed() != null) {
                Long poin = user.getPoint();
                poin = poin - input.getPointInUsed();
                user.setPoint(poin);
            }

            List<SaleOrderItem> saleOrderItems = cartRes.getItems().stream().map(itemCart -> {
                        SaleOrderItem saleOrderItem = convertItemCartToItemRes(itemCart);
                        saleOrderItem.setTotalPrice(itemCart.findFinalPrice(vatPercent));
                        saleOrderItem.setVatPrice(itemCart.findVatPrice(vatPercent));
                        saleOrderItem.setSaleOrderCode(orderCode);

                        return saleOrderItem;
                    }
            ).collect(Collectors.toList());
            saleOrderDao.saveAllItem(saleOrderItems);
            Type listType = new TypeToken<List<SaleOrderItem>>() {
            }.getType();
            String saleOrderRes = gson.toJson(saleOrderItems, listType);
            order.setSaleOrderItem(saleOrderRes);

            saleOrderDao.saveOrder(order);
            builder.add(new ChangeInfo("saleOrder", null, String.format("Khởi tạo đơn hàng %s", orderCode)));

            cartService.deleteCartByCurrentUser(user.getId(), OrderType.SALE_ORDER.getValue());

            transactionManager.commit(transaction);

            OrderRes res = orderMapper.entityToRes(order);
            res.setOrderCode(orderCode);
            res.setListCart(saleOrderRes);
            res.setOrderType(order.getOrderType());

            writeLogUpdateSaleOrder(builder, order.getOrderId(), orderCode, order.getOrderType());
            return res;

        } catch (ConstraintViolationException e) {
            transactionManager.rollback(transaction);
            throw e;
        }
    }

    private void writeLogUpdateSaleOrder(LogDifferentBuilder builder, Long orderId, String orderCode, Integer orderType) {
        if (CollectionUtils.isEmpty(builder.getChangeInfoList()))
            return;
        UserPrincipal userPresent = (UserPrincipal)SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Long userId = Optional.ofNullable(userPresent.getId()).orElse(null);
        String createdBy = Optional.ofNullable(userPresent.getName()).orElse(null);
        String userEmail = Optional.ofNullable(userPresent.getEmail()).orElse(null);
        LogHistoryRequest logRQ = LogHistoryRequest.builder()
                .action(builder.getAction())
                .actionExtend("")
                .object(LogObjectType.SALE_ORDER)
                .changeInfoList(builder.getChangeInfoList())
                .objectId(orderCode)
                .extendId(orderId)
                .userId(userId)
                .orderType(orderType)
                .userName(createdBy)
                .userEmail(userEmail)
                .build();
        changeLogService.logHistory(logRQ);
    }

    private SaleOrderItem convertItemCartToItemRes(CartItemRes itemCart){
        SaleOrderItem saleOrderItem = new SaleOrderItem();
        saleOrderItem.setProductId(itemCart.getProductId());
        saleOrderItem.setCreatedOn(Instant.now());
        saleOrderItem.setChannel(itemCart.getChannel());
        saleOrderItem.setDiscount(itemCart.findDiscountPrice());
        saleOrderItem.setProductId(itemCart.getProductId());
        saleOrderItem.setBonusPoint(itemCart.findPoint());
        saleOrderItem.setStatus(OrderStatus.PENDING.getValue());
        saleOrderItem.setQuantity(itemCart.getQuantity());
        saleOrderItem.setProductName(itemCart.getProductName());
        saleOrderItem.setNetPrice(itemCart.getVndPrice());
        return saleOrderItem;
    }

    @Override
    public PaginationPage<GetListCommonOrderRes> getListOrder(GetListCommonOrderReq req) throws Exception {
        UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Long userId;
        if (AccountRole.ADMIN.getTypeInStr().equals(userPresent.getRole())) {
            userId = null;
        } else {
            userId = userPresent.getId();
        }
        PaginationPage<ListCommonOrderConverter> converter = saleOrderDao.getListSaleOrder(req.getKey(),
                req.getOrderDateFrom(), req.getOrderDateTo(),
                req.getStatus(), req.getPage(), req.getSize(), userId);
        PaginationPage<GetListCommonOrderRes> result = new PaginationPage<>();
        List<GetListCommonOrderRes> orderDtoList = converter.getElements().stream().map(item -> orderMapper.converterToResponse(item)).collect(Collectors.toList());
        result.setElements(orderDtoList);
        result.setTotalElements(converter.getTotalElements());
        return result;
    }

    @Override
    public List<OrderRes> getListOrderByGrossCode(String code) {
        List<SaleOrder> saleOrders = getDao(OrderType.SALE_ORDER).saleOrder().findByGrossCode(code);
        return saleOrders.stream().map(item -> orderMapper.entityToRes(item)).collect(Collectors.toList());
    }

    @Override
    public SaleOrderDetailForPrePay getListSaleOrderItemByOrderCode(String orderCode, Integer page, Integer size) {
        PaginationPage<SaleOrderItemRes> result = new PaginationPage<>();
        PaginationPage<SaleOrderItemConverter> converter = saleOrderDao.getSaleOrderDetail(orderCode, page, size);
        result.setElements(converter.getElements().stream().map(item -> orderMapper.converterToItemResponse(item)).collect(Collectors.toList()));
        result.setTotalElements(converter.getTotalElements());
        SaleOrderDetailForPrePay saleOrderDetailForPrePay = orderMapper.converterToDetailResponse(saleOrderDao.getTotalPriceForOrderDetail(orderCode));
        saleOrderDetailForPrePay.setItemDetail(result);
        return saleOrderDetailForPrePay;
    }

    @Override
    @Transactional(rollbackFor = {MultiLangException.class, Exception.class})
    @SneakyThrows
    public Integer updateStatusSaleOrder(UpdateOrderStatusReq req) {
        SaleOrder saleOrder = saleOrderDao.findSaleOrderByCode(req.getOrderCode());
        List<SaleOrderItem> saleOrderItem = saleOrderDao.findSaleOrderItemByCode(req.getOrderCode());

        if (saleOrder == null) throw new MultiLangException(ResultCodes.SALE_ORDER_NOT_FOUND, req.getOrderCode());
        Integer updateType = req.getUpdateType();
        switch (updateType) {
            case 1: // confirm
                if (!saleOrder.canConfirm()) throw new MultiLangException(ResultCodes.SALE_ORDER_CANT_CONFIRM);
                saleOrder.confirm();

                for (SaleOrderItem item : saleOrderItem) {
                    if (item.canConfirm()) item.confirm();
                }
                break;
            case 2: // change status
                saleOrder.setStatus(changeStatus(saleOrder.getStatus()));
                for (SaleOrderItem item : saleOrderItem) {
                    item.setStatus(changeStatus(item.getStatus()));
                }
                break;
            case 3: //reject
                if (!saleOrder.canReject())
                    throw new MultiLangException(ResultCodes.SALE_ORDER_CANT_REJECT, saleOrder.getOrderCode());
                saleOrder.reject();
                for (SaleOrderItem item : saleOrderItem) {
                    item.reject();
                }
                break;
            case 4: //cancel
                saleOrder.cancel();
                for (SaleOrderItem item : saleOrderItem) {
                    item.cancel();
                }
                break;
            default:
                throw new MultiLangException(ResultCodes.DATA_INVALID, updateType);
        }

        saleOrderDao.saveOrder(saleOrder);
        saleOrderDao.saveAllItem(saleOrderItem);
        return saleOrder.getStatus();
    }

    @Override
    @Scheduled(cron = "0 0 0 * * ?")
    public void rejectSaleOrderAfterDueDate() {
        Integer page = 0;
        Integer size = 300;
        Pageable pageable = PageRequest.of(page, size);
        Page<SaleOrder> pageSaleOrder = saleOrderDao.findAllSaleOrderByPage(pageable);
        List<SaleOrder> res = new ArrayList<>();
        while (!pageSaleOrder.isEmpty() && pageSaleOrder.getTotalElements() > 0) {
            page++;
            List<SaleOrder> list = pageSaleOrder.getContent().stream().peek(so -> {
                if (so.getDueDate().isAfter(Instant.now()) && OrderStatus.PENDING.getValue().equals(so.getStatus())) {
                    so.setStatus(OrderStatus.REJECTED.getValue());
                }
            }).collect(Collectors.toList());
            res.addAll(list);
        }
        saleOrderDao.saveAll(res);
    }


    private Integer changeStatus(Integer status) {
        if (OrderStatus.PENDING.getValue().equals(status)) {
            throw new RuntimeException("You must confirm this order before doing another!");
        }
        if (OrderStatus.BUYING.getValue().equals(status)) {
            return OrderStatus.BUYING_COMPLETED.getValue();
        }
        if (OrderStatus.BUYING_COMPLETED.getValue().equals(status)) {
            return OrderStatus.DELIVERING.getValue();
        }
        if (OrderStatus.DELIVERING_VN.getValue().equals(status)) {
            return OrderStatus.DELIVERING.getValue();
        }
        if (OrderStatus.DELIVERING.getValue().equals(status)) {
            return OrderStatus.DELIVERED.getValue();
        }
        if (OrderStatus.DELIVERED.getValue().equals(status)) {
            return OrderStatus.COMPLETED.getValue();
        }
        return status;
    }

    @Async
    public void changeItemStatus(List<Long> ids, Integer updateType){
        List<SaleOrderItem> saleOrderItems = saleOrderDao.findByListIds(ids);
        if(saleOrderItems == null) throw new RuntimeException("No data input");
        List<SaleOrderItem> list = saleOrderItems.stream().map(
                item -> {
                    if(updateType == 1 && item.canConfirm()){
                        item.confirm();
                    }
                    else if(updateType == 3 && item.canReject()){
                        item.reject();
                    }
                    else if(updateType == 4 && item.canReject()){
                        item.cancel();
                    }
                    else{
                        changeStatus(item.getStatus());
                    }
                    return item;
                }
        ).collect(Collectors.toList());
        saleOrderDao.saveAllItem(saleOrderItems);
    }
}
