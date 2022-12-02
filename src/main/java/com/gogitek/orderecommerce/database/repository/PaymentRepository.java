package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.PaymentListConverter;
import com.gogitek.orderecommerce.database.entity.common.CommonPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<CommonPayment, Long> {
    @Query(value = "select order_code as orderCode," +
            "payment_time as paymentTime," +
            "deposit_percent as depositPercent," +
            "image_payment as imagePayment," +
            "deposit_amount as depositAmount," +
            "remaining_amount as remainingAmount, " +
            "total_amount as totalAmount," +
            "status as status, " +
            "failed_at as failedAt," +
            "error_code as errorCode," +
            "error_text as errorText, " +
            "orderType as orderType " +
            "from common_payment " +
            "where 1 = 1 " +
            "and order_code like %?1%", nativeQuery = true)
    Page<PaymentListConverter> getListPayment(String key, Pageable pageable);

    @Query(value = "select * from common_payment where order_code = ?1 limit 1", nativeQuery = true)
    Optional<CommonPayment> findByOrderCode(String orderCode);
}
