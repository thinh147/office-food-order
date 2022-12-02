package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.common.constant.OrderType;
import com.gogitek.orderecommerce.config.common.AutoGenerateCode;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.FastOrderInput;
import com.gogitek.orderecommerce.controller.dto.req.GetListCommonOrderReq;
import com.gogitek.orderecommerce.controller.dto.req.UpdateOrderStatusReq;
import com.gogitek.orderecommerce.controller.dto.res.*;
import com.gogitek.orderecommerce.controller.service.FastOrderService;
import com.gogitek.orderecommerce.database.converter.FastOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.FastOrderItem;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import com.gogitek.orderecommerce.database.repo_abstract.Dao;
import com.gogitek.orderecommerce.service.mapper.FastOrderMapper;
import com.gogitek.orderecommerce.service.mapper.OrderMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import java.lang.reflect.Type;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FastOrderServiceImp implements FastOrderService {
    FastOrderMapper fastOrderMapper;
    OrderMapper orderMapper;
    AutoGenerateCode gen;
    ApplicationContext context;

    PlatformTransactionManager transactionManager;

    public Dao getDao() {
        return (Dao) context.getBean("foDao");
    }

    @Override
    public OrderRes createFastOrder(FastOrderInput input) {
        Gson gson = new Gson();
        UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        List<FastOrderInput.FastOrderItem> items = input.getItems();
        DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
        TransactionStatus transaction = transactionManager.getTransaction(definition);
        try {
            String orderCode = gen.generate();
            FastOrder fastOrder = convertFastOrderInputToFastOrder(input, userPresent.getId(), orderCode);
            getDao().fastOrder().save(fastOrder);
            getDao().fastOrder().saveItems(createFastOrderItem(items, orderCode));
            Type listType = new TypeToken<List<SaleOrderItem>>() {
            }.getType();
            String saleOrderRes = gson.toJson(input.getItems(), listType);
            return OrderRes
                    .builder()
                    .discount(input.getVoucherPrice())
                    .dueDate(fastOrder.getDueDate())
                    .orderItem(saleOrderRes)
                    .finalPrice(input.getFinalPrice())
                    .listCart(saleOrderRes)
                    .orderDate(fastOrder.getCreatedAt())
                    .orderCode(fastOrder.getOrderCode())
                    .totalVat(fastOrder.getVatPrice())
                    .totalNetPrice(fastOrder.getNetPrice())
                    .orderType(OrderType.FAST_ORDER.getValue())
                    .build();
        }catch (Exception e){
            transactionManager.rollback(transaction);
            throw e;
        }
    }

    private FastOrder convertFastOrderInputToFastOrder(FastOrderInput input, Long userId, String orderCode){
        FastOrder fastOrder = new FastOrder();
        fastOrder.setOrderCode(orderCode);
        fastOrder.setVatPrice(input.getVatPrice());
        fastOrder.setNetPrice(input.getNetPrice());
        fastOrder.setFinalPrice(input.getFinalPrice());
        fastOrder.setPointInUsed(input.getPointUsed());
        fastOrder.setVoucherPrice(input.getVoucherPrice());
        fastOrder.setAddress(input.getAddress().getAddress());
        fastOrder.setAddressId(input.getAddress().getAddressId());
        fastOrder.setUserId(userId);
        fastOrder.setStatus(OrderStatus.PENDING.getValue());
        fastOrder.setOrderType(OrderType.FAST_ORDER.getValue());
        fastOrder.setCreatedAt(Instant.now());
        fastOrder.setUpdatedAt(Instant.now());
        return fastOrder;
    }
    @Override
    public FastOrderResForPrePay getFastOrderDetail(String orderCode, Integer page, Integer size) {
        PaginationPage<FastOrderItemRes> result = new PaginationPage<>();
        PaginationPage<FastOrderItemConverter> converter = getDao().fastOrder().getListDetailFastOrderItemByCode(orderCode, page, size);
        result.setElements(converter.getElements().stream().map(item -> fastOrderMapper.converterToResponse(item)).collect(Collectors.toList()));
        result.setTotalElements(converter.getTotalElements());
        FastOrderResForPrePay saleOrderDetailForPrePay = fastOrderMapper.converterToResPrePay(getDao().fastOrder().getInformationForPrePaymentByCode(orderCode));
        if (saleOrderDetailForPrePay == null) return null;
        saleOrderDetailForPrePay.setItemDetail(result);
        return saleOrderDetailForPrePay;
    }

    @Override
    public PaginationPage<GetListCommonOrderRes> getListFastOrder(GetListCommonOrderReq req) {
        try {
            UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            Long userId = null;
            if (AccountRole.CUSTOMER.getTypeInStr().equals(userPresent.getRole())) userId = userPresent.getId();
            PaginationPage<GetListCommonOrderRes> res = new PaginationPage<>();
            PaginationPage<ListCommonOrderConverter> converters = getDao().fastOrder().getListFastOrder(req, userId);
            res.setTotalElements(converters.getTotalElements());
            res.setElements(converters.getElements().stream().map(converter -> orderMapper.converterToResponse(converter)).collect(Collectors.toList()));
            return res;
        } catch (Exception e) {
            return null;
        }
    }

    private List<FastOrderItem> createFastOrderItem(List<FastOrderInput.FastOrderItem> items, String orderCode) {
        return items.stream().map(dto -> {
            FastOrderItem item = fastOrderMapper.requestToEntity(dto);
            item.setFastOrderCode(orderCode);
            item.setCreatedDate(Instant.now());
            item.setStatus(OrderStatus.PENDING.getValue());
            item.setCreatedDate(Instant.now());
            return item;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = {MultiLangException.class, Exception.class})
    @SneakyThrows
    public Integer updateStatusFastOrder(UpdateOrderStatusReq req) {
        try {
            FastOrder fastOrder = getDao().fastOrder().findFastOrderByCode(req.getOrderCode()).orElse(null);
            List<FastOrderItem> saleOrderItem = getDao().fastOrder().findFastOrderItemByCode(req.getOrderCode());

            if (fastOrder == null) throw new MultiLangException(ResultCodes.SALE_ORDER_NOT_FOUND, req.getOrderCode());
            Integer updateType = req.getUpdateType();
            Integer status = fastOrder.getStatus();
            switch (updateType) {
                case 1: // confirm
                    if (!fastOrder.canConfirm()) throw new MultiLangException(ResultCodes.SALE_ORDER_CANT_CONFIRM);
                    fastOrder.confirm();

                    for (FastOrderItem item : saleOrderItem) {
                        if (item.canConfirm()) item.confirm();
                    }
                    break;
                case 2: // change status
                    fastOrder.setStatus(changeStatus(status));
                    for (FastOrderItem item : saleOrderItem) {
                        item.setStatus(changeStatus(item.getStatus()));
                    }
                    break;
                case 3: //reject
                    if (!fastOrder.canReject())
                        throw new MultiLangException(ResultCodes.SALE_ORDER_CANT_REJECT, fastOrder.getOrderCode());
                    fastOrder.reject();
                    for (FastOrderItem item : saleOrderItem) {
                        item.reject();
                    }
                    break;
                case 4: //cancel
                    fastOrder.cancel();
                    for (FastOrderItem item : saleOrderItem) {
                        item.cancel();
                    }
                    break;
                default:
                    throw new MultiLangException(ResultCodes.DATA_INVALID, updateType);
            }
            getDao().fastOrder().save(fastOrder);
            return fastOrder.getStatus();
        }catch (Exception e){
            throw e;
        }
    }

    private Integer changeStatus(Integer status) {
        if(OrderStatus.PENDING.getValue().equals(status)){
            throw new RuntimeException("You must to confirm this Fast Order before change its status!");
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
        List<FastOrderItem> saleOrderItems = getDao().fastOrder().findListFastOrderItemByIdsIn(ids);
        if(saleOrderItems == null) throw new RuntimeException("No data input");
        List<FastOrderItem> list = saleOrderItems.stream().peek(
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
                }
        ).collect(Collectors.toList());
        getDao().fastOrder().saveItems(list);
    }

    @Override
    public List<OrderRes> findFastOrderByGrossCode(String code) {
        List<FastOrder> fastOrders = getDao().fastOrder().findByGrossCode(code);
        return fastOrders.stream().map(item -> fastOrderMapper.entityToResponse(item)).collect(Collectors.toList());
    }
}
