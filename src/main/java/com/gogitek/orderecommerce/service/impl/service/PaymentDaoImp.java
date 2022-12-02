package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.PaymentSearchOption;
import com.gogitek.orderecommerce.dao.PaymentDao;
import com.gogitek.orderecommerce.database.converter.PaymentListConverter;
import com.gogitek.orderecommerce.database.entity.common.CommonPayment;
import com.gogitek.orderecommerce.database.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class PaymentDaoImp implements PaymentDao {
    PaymentRepository paymentRepo;
    @Override
    @Transactional
    public void savePayment(CommonPayment commonPayment) {
        try {
            paymentRepo.save(commonPayment);
        }catch (RuntimeException e){
            log.error(e.getMessage(), e);
        }

    }

    @Override
    public PaginationPage<PaymentListConverter> getListPaymentConverter(PaymentSearchOption option) {
        PaginationPage<PaymentListConverter> response = new PaginationPage<>();
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(option.getPage(), option.getSize(), sort);
        Page<PaymentListConverter> data = paymentRepo.getListPayment(option.getOrderCode(), pageable);
        response.setElements(data.getContent());
        response.setTotalElements(data.getTotalElements());
        return response;
    }

    @Override
    public Optional<CommonPayment> findPaymentByOrderCode(String orderCode) {
        return paymentRepo.findByOrderCode(orderCode);
    }
}
