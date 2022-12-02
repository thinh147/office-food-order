package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.CommonConst;
import com.gogitek.orderecommerce.common.constant.PaymentStatus;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.log.*;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.PaymentReq;
import com.gogitek.orderecommerce.controller.dto.req.PaymentSearchOption;
import com.gogitek.orderecommerce.controller.dto.res.PaymentListRes;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import com.gogitek.orderecommerce.controller.service.ChangeLogService;
import com.gogitek.orderecommerce.controller.service.PaymentService;
import com.gogitek.orderecommerce.dao.PaymentDao;
import com.gogitek.orderecommerce.database.converter.PaymentListConverter;
import com.gogitek.orderecommerce.database.entity.common.CommonPayment;
import com.gogitek.orderecommerce.service.mapper.PaymentMapper;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class PaymentServiceImp implements PaymentService {
    PaymentDao paymentDao;

    PaymentMapper paymentMapper;

    ChangeLogService changeLogService;

    @Override
    @Transactional(rollbackFor = {Exception.class, GogitekException.class})
    @SneakyThrows
    public void createPayment(PaymentReq paymentInput) {
        CommonPayment payment = new CommonPayment();
        try {
            LogDifferentBuilder logDiffBuilder = new LogDifferentBuilder();
            if(paymentInput == null) {
                throw new GogitekException.NotFoundException("Order");
            }

            OrderRes saleOrder = paymentInput.getPaymentInput();
            if(saleOrder == null)
                throw new GogitekException.NotFoundException("Order");
            if(saleOrder.getOrderCode() == null)
                throw new GogitekException.NotFoundException("Cannot find Order Code");
//            if(paymentInput.getPaymentImage().equals("") && paymentInput.getPaymentImage() == null)
//                throw new GogitekException.NotRetryException(saleOrder.getOrderCode());
            if(saleOrder.getFinalPrice() == null)
                throw new GogitekException.NotFoundException("final price");
            Double depositPercent = paymentInput.getDepositPercent();
            Double totalPrice = saleOrder.getFinalPrice();
            if(totalPrice >= CommonConst.MAX_AMOUNT_DEPOSIT.getValue()) {
                depositPercent = Double.valueOf(CommonConst.MAX_DEPOSIT.getValue());
            }
            payment.setOrderType(paymentInput.getOrderType());
            payment.setTotalAmount(totalPrice);
            payment.setImagePayment(paymentInput.getPaymentImage());
            logDiffBuilder.add(new ChangeInfo("imagePayment", null, String.format("Gửi ảnh thanh toán thành công vào lúc %s",Instant.now())));
            payment.setRemainingAmount(saleOrder.getFinalPrice() - paymentInput.getDepositAmount());
            payment.setOrderCode(saleOrder.getOrderCode());
            payment.setDepositAmount(paymentInput.getDepositAmount());

            payment.setDepositPercent(depositPercent);
            payment.setOrderCode(saleOrder.getOrderCode());
            payment.init();

            paymentDao.savePayment(payment);
            logDiffBuilder.setAction(LogAction.ADD);
            logDiffBuilder.add(new ChangeInfo("payment", null, String.format("khởi tạo thanh toán cho đơn hàng %s vào lúc %s", saleOrder.getOrderCode(), Instant.now())));
            writeLogUpdatePayment(logDiffBuilder, payment.getId(), payment.getOrderType(), saleOrder.getOrderCode());
        }catch (GogitekException e){
            log.error(e.getMessage(), e);
            payment.failHandle(e.getMessage(), e.getCode());
            payment.setStatus(PaymentStatus.FAILED.getValue());
        }
    }

    private void writeLogUpdatePayment(LogDifferentBuilder builder, Long paymentId, Integer orderType, String orderCode) {
        if (CollectionUtils.isEmpty(builder.getChangeInfoList()))
            return;
        UserPrincipal userPresent = (UserPrincipal) SecurityContextHolder
                .getContext().getAuthentication()
                .getPrincipal();
        Long userId = Optional.ofNullable(userPresent.getId()).orElse(null);
        String createdBy = Optional.ofNullable(userPresent.getName()).orElse(null);
        String userEmail = Optional.ofNullable(userPresent.getEmail()).orElse(null);
        LogHistoryRequest logRQ = LogHistoryRequest.builder()
                .action(builder.getAction())
                .actionExtend("")
                .object(LogObjectType.PAYMENT)
                .changeInfoList(builder.getChangeInfoList())
                .objectId(orderCode)
                .extendId(paymentId)
                .userId(userId)
                .userName(createdBy)
                .userEmail(userEmail)
                .orderType(orderType)
                .build();
        changeLogService.logHistory(logRQ);
    }

    @Override
    public PaginationPage<PaymentListRes> getListPayment(PaymentSearchOption option) {
        if(option == null) return null;
        PaginationPage<PaymentListConverter> converterList = paymentDao.getListPaymentConverter(option);
        PaginationPage<PaymentListRes> response = new PaginationPage<>();
        response.setTotalElements(converterList.getTotalElements());
        response.setElements(converterList.getElements().stream().map(item -> paymentMapper.converterToEntity(item)).collect(Collectors.toList()));
        return response;
    }

    @Override
    @SneakyThrows
    public void confirm(String orderCode) {
        Optional<CommonPayment> paymentOpt = paymentDao.findPaymentByOrderCode(orderCode);
        if(paymentOpt.isEmpty()) throw new MultiLangException(ResultCodes.NOT_FOUND);
        CommonPayment payment = paymentOpt.get();

        Integer status = payment.getStatus();

        if(PaymentStatus.PENDING.getValue() == status) {
            payment.confirm();
        }

        else {
            throw new MultiLangException(ResultCodes.ALREADY_CONFIRM);
        }

        paymentDao.savePayment(payment);
    }
}
