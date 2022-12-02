package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.FastOrderItemConverter;
import com.gogitek.orderecommerce.database.entity.FastOrderItem;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FastOrderItemRepo extends JpaRepository<FastOrderItem, Long> {
    @Query(value = "select foi.id as id,  " +
            "fo.completed_date as completedDate,   " +
            "u.`name` as userName," +
            "u.email as userEmail,   " +
            "u.id as userId,   " +
            "u.phone as userPhone,   " +
            "foi.discount_price as discount,   " +
            "foi.final_price as itemFinalPrice,   " +
            "fo.created_at as orderDate,   " +
            "foi.status as status,   " +
            "fo.updated_at as updatedAt,   " +
            "foi.fast_order_code as fastOrderCode,  " +
            "foi.quantity as quantity,  " +
            "p.status as paymentStatus, " +
            "foi.color as color, " +
            "foi.percent_discount as percentDiscount, " +
            "foi.size as size, " +
            "p.image_payment as paymentImage,   " +
            "p.order_type as orderType," +
            "foi.product_url as productUrl," +
            "foi.total_net_price as totalNetPrice," +
            "foi.total_vat_amount as totalVATAmount," +
            "foi.note  as note," +
            "p.deposit_percent as depositPercent," +
            "p.deposit_amount as depositAmount     " +
            "from fast_order_item as foi   " +
            "left join fast_order as fo on foi.fast_order_code = fo.order_code   " +
            "left join common_payment as p on fo.order_code = p.order_code " +
            "left join users as u on fo.user_id = u.id " +
            "where foi.fast_order_code = ?1   " +
            "GROUP BY foi.id", nativeQuery = true)
    Page<FastOrderItemConverter> getListDetailFastOrderItemByCode(String code, Pageable pageable);

    @Query(value = "select * from fast_order_item where fast_order_code = ?1", nativeQuery = true)
    List<FastOrderItem> findByFastOrderCode(String code);

    List<FastOrderItem> findByIdIn(List<Long> ids);
}
