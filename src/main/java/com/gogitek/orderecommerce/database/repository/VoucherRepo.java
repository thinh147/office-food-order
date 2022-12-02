package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.controller.dto.req.VoucherListReq;
import com.gogitek.orderecommerce.database.converter.VoucherConverter;
import com.gogitek.orderecommerce.database.entity.common.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VoucherRepo extends JpaRepository<Voucher, Long> {
    @Query(value = "select vc.id as id, " +
            "vc.code as code, " +
            "vc.discount as discount, " +
            "vc.min_value_to_use as minValueToUse, " +
            "vc.max_price as maxPriceDiscount, " +
            "vc.start_date as startDate," +
            "vc.due_date as dueDate," +
            "vc.product_id as productId, " +
            "vc.quantity as quantity, " +
            "vcu.quantity_remaining as quantityRemaining," +
            "vc.is_active as isActive," +
            "vc.channel as channel," +
            "vc.discount_type as discountType " +
            "from voucher as vc " +
            "left join voucher_user_entity as vcu on vc.id = vcu.voucher_id " +
            "where 1 = 1 " +
            "and (?1 is null or vc.code like %?1%) " +
            "and (?2 is null or vc.is_active = ?2) " +
            "and (vcu.user_id is null or ?3 is null or vcu.user_id = ?3)", nativeQuery = true)
    Page<VoucherConverter> getListVoucher(String code, Integer status, Long userId, Pageable pageable);
}
