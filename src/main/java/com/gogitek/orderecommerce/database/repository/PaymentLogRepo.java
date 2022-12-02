package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.config.log.ChangeInfo;
import com.gogitek.orderecommerce.database.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentLogRepo extends JpaRepository<PaymentLog, Long> {
    @Query(value = "select pl.changeInfos from PaymentLog pl left join SaleOrder so on pl.objectId = so.orderCode where so.orderCode = :objectId and pl.orderType = :orderType")
    String getHistoryOfSaleOrder(@Param("objectId") String objectId, @Param("orderType") Integer orderType);

    @Query(value = "select pl.changeInfos from PaymentLog pl left join FastOrder fo on pl.objectId = fo.orderCode where fo.orderCode = :objectId and pl.orderType = :orderType")
    String getHistoryOfFastOrder(@Param("objectId") String objectId, @Param("orderType") Integer orderType);
}
