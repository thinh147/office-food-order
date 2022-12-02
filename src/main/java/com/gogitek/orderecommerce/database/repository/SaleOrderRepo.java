package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.converter.TotalPriceOrderConverter;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaleOrderRepo extends JpaRepository<SaleOrder, Long> {
    @Query(value = "select so.id as id, " +
            "so.customer_name as customerName, " +
            "so.customer_email as customerEmail, " +
            "so.customer_phone as customerPhone, " +
            "so.status as status, so.order_code as code, " +
            "so.final_price as totalPrice, " +
            "so.order_date as orderDate, " +
            "p.deposit_amount as depositPrice, " +
            "p.status as paymentStatus, " +
            "p.payment_time as paymentDate," +
            "p.remaining_amount as remainingAmount," +
            "p.deposit_percent as depositPercent," +
            "p.deposit_amount as depositAmount " +
            "from sale_order as so left join common_payment as p " +
            "on so.order_code = p.order_code " +
            "where 1 = 1 " +
            "and (?1 is null " +
            "   or so.customer_email like %?1% " +
            "   or so.customer_phone like %?1% " +
            "   or so.order_code like %?1% ) " +
            "and (?2 is null or DATE(so.order_date) >= ?2) " +
            "and (?3 is null or DATE(so.order_date) >= ?3) " +
            "and (COALESCE(?4) is null or so.status in (?4)) " +
            "and (?5 is null or so.customer_id = ?5) " +
            "and p.order_type = 1 " +
            "GROUP BY so.id",
            countQuery = "select count(so.id) " +
                    "from sale_order as so left join common_payment as p " +
                    "on so.order_code = p.order_code " +
                    "where 1 = 1 " +
                    "and (?1 is null " +
                    "   or so.customer_email like %?1% " +
                    "   or so.customer_phone like %?1% " +
                    "   or so.order_code like %?1% ) " +
                    "and (?2 is null or DATE(so.order_date) >= ?2) " +
                    "and (?3 is null or DATE(so.order_date) >= ?3) " +
                    "and (COALESCE(?4) is null or so.status in (?4)) " +
                    "and (?5 is null or so.customer_id = ?5) " +
                    "and order_type = 1 " +
                    "GROUP BY so.id",
            nativeQuery = true)
    Page<ListCommonOrderConverter> getListSaleOrder(String key, String orderDateFrom, String orderDateTo, List<Integer> status, Long userId, Pageable pageable);

    @Query(value = "SELECT so.final_price as finalPrice, " +
            "so.total_vat as vatPrice, " +
            "so.total_net_price as netPrice, " +
            "so.discount as discountPrice, " +
            "p.deposit_percent as depositPercent, " +
            "p.deposit_amount as depositPrice, " +
            "so.due_date as dueDate, " +
            "p.remaining_amount as remainingPrice," +
            "so.address_id as addressId,  " +
            "so.address as address," +
            "so.order_type as orderType,  " +
            "so.order_code as code," +
            "so.status as status " +
            "FROM sale_order so " +
            "left join common_payment p " +
            "on so.order_code = p.order_code " +
            "where so.order_code = ?1 group by so.order_code ", nativeQuery = true)
    TotalPriceOrderConverter getDetailPriceConverterForOrderByCode(String code);

    @Query(value = "select * from sale_order where order_code = ?1", nativeQuery = true)
    Optional<SaleOrder> findByOrderCode(String code);

    List<SaleOrder> findByOrderCodeIn(List<String> orderCode);

    List<SaleOrder> findByGrossCode(String grossCode);

    @Query(value = "select s from SaleOrder s where s.status not in (:status) and s.shipperId is null")
    List<SaleOrder> findByStatusNotContainingAndShipperIdIsNull(@Param("status") Integer status);
}
