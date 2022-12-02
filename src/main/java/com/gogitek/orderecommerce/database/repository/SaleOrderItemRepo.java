package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.TotalPriceOrderConverter;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface SaleOrderItemRepo extends JpaRepository<SaleOrderItem, Long> {
    @Query(value = "select soi.id as id, " +
            "so.completed_date as completedDate,  " +
            "so.customer_name as userEmail,  " +
            "so.customer_id as userId,  " +
            "so.customer_phone as userPhone,  " +
            "soi.discount as discount,  " +
            "soi.total_price as itemFinalPrice,  " +
            "so.order_date as orderDate,  " +
            "soi.status as status,  " +
            "so.updated_at as updatedAt,  " +
            "soi.sale_order_code as saleOrderCode,  " +
            "soi.product_id as productId,  " +
            "soi.channel as channel,  " +
            "mt.config_name as config,  " +
            "mt.options as option,  " +
            "soi.quantity as quantity,  " +
            "pr.image_url as productImage, " +
            "pr.name as productName, " +
            "p.status as paymentStatus, " +
            "p.image_payment as paymentImage,  " +
            "p.order_type as orderType  " +
            "from sale_order_item as soi  " +
            "left join sale_order as so on soi.sale_order_code = so.order_code  " +
            "left join product as pr on pr.id = soi.product_id " +
            "left join common_payment as p on so.order_code = p.order_code  " +
            "left join metadata as mt on mt.product_id = pr.id  " +
            "where soi.sale_order_code = ?1  " +
            "GROUP BY soi.id",
            countQuery = "select count(soi.id) " +
                    "from sale_order_item as soi  " +
                    "left join sale_order as so on soi.sale_order_code = so.order_code  " +
                    "left join product as pr on pr.id = soi.product_id " +
                    "left join common_payment as p on so.order_code = p.order_code  " +
                    "left join metadata as mt on mt.product_id = pr.id  " +
                    "where soi.sale_order_code = ?1 " +
                    "GROUP BY soi.id",nativeQuery = true)
    Page<SaleOrderItemConverter> getListSaleOrderItemByOrderCode(String orderCode, Pageable pageable);

    @Query(value = "select SUM(total_price) as finalPrice, " +
            "SUM(vat_price) as vatPrice, " +
            "SUM(discount) as discountPrice, " +
            "SUM(net_price) as netPrice " +
            "from sale_order_item " +
            "where sale_order_code = ?1 " +
            "GROUP BY sale_order_code", nativeQuery = true)
    TotalPriceOrderConverter getTotalPriceByOrderCode(String orderCode);


    @Query(value = "select * from sale_order_item where sale_order_code = ?1", nativeQuery = true)
    List<SaleOrderItem> findBySaleOrderCode(String code);

    List<SaleOrderItem> findByIdIn(List<Long> ids);
}
