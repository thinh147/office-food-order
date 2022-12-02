package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.GetFastOrderInforForPrePaymentConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FastOrderRepo extends JpaRepository<FastOrder, Long> {
    @Query(value = "SELECT so.total_final_price as finalPrice,  " +
            "so.total_vat_price as vatPrice,  " +
            "so.total_net_price as netPrice,  " +
            "so.voucher_price as voucherPrice, " +
            "so.point_in_used as point_in_used, " +
            "so.due_date as due_date," +
            "so.created_at as createdAt, " +
            "so.status as status, " +
            "so.order_type as orderType, " +
            "p.deposit_percent as depositPercent,  " +
            "p.deposit_amount as depositPrice,  " +
            "p.remaining_amount as ramainingPrice, " +
            "so.address_id as addressId,   " +
            "so.address as address,   " +
            "so.order_code as code " +
            "FROM fast_order so  " +
            "left join common_payment p  " +
            "on so.order_code = p.order_code " +
            "where so.order_code = ?1 " +
            "group by so.order_code " , nativeQuery = true)
    GetFastOrderInforForPrePaymentConverter getFastOrderInforForPrePaymentByOrderCode(String orderCode);

    List<FastOrder> findByOrderCodeIn(List<String> orderCodes);

    @Query(value = "SELECT " +
            "fo.id AS id, " +
            "u.`name` AS customerName, " +
            "u.email AS customerEmail, " +
            "u.phone AS customerPhone, " +
            "fo.status AS status, " +
            "fo.order_code AS CODE, " +
            "fo.total_final_price AS totalPrice, " +
            "fo.created_at AS orderDate, " +
            "fo.address as address, " +
            "p.deposit_amount AS depositPrice, " +
            "p.STATUS AS paymentStatus, " +
            "fo.updated_at as updatedDate, " +
            "p.payment_time as paymentDate," +
            "p.remaining_amount as remainingAmount," +
            "p.deposit_percent as depositPercent," +
            "p.deposit_amount as depositAmount " +
            "FROM " +
            "fast_order AS fo " +
            "LEFT JOIN common_payment AS p ON fo.order_code = p.order_code " +
            "LEFT JOIN users as u on fo.user_id = u.id " +
            "where 1 = 1 " +
            "and (?1 is null " +
            "   or u.email like %?1% " +
            "   or u.phone like %?1% " +
            "   or fo.order_code like %?1% ) " +
            "and (?2 is null or DATE(fo.created_at) >= ?2) " +
            "and (?3 is null or DATE(fo.created_at) >= ?3) " +
            "and (COALESCE(?4) is null or fo.status in (?4)) " +
            "and (?5 is null or u.id = ?5) " +
            "GROUP BY fo.id",
            countQuery = "SELECT count(so.id) " +
                    "FROM fast_order AS fo " +
                    "LEFT JOIN common_payment AS p ON fo.order_code = p.order_code " +
                    "LEFT JOIN users as u on fo.user_id = u.id " +
                    "where 1 = 1 " +
                    "and (?1 is null " +
                    "   or u.email like %?1% " +
                    "   or u.phone like %?1% " +
                    "   or fo.order_code like %?1% ) " +
                    "and (?2 is null or DATE(fo.created_at) >= ?2) " +
                    "and (?3 is null or DATE(fo.created_at) >= ?3) " +
                    "and (COALESCE(?4) is null or fo.status in (?4)) " +
                    "and (?5 is null or u.id = ?5) " +
                    "GROUP BY fo.id",nativeQuery = true)
    Page<ListCommonOrderConverter> getListFastOrder(String key, String orderDateFrom, String orderDateTo, List<Integer> status, Long userId, Pageable pageable);


    @Query(value = "select * from fast_order where order_code = ?1", nativeQuery = true)
    Optional<FastOrder> findByOrderCode(String code);

    List<FastOrder> findByGrossCode(String grossCode);
}
