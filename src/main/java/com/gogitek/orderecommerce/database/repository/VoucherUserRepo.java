package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.VoucherUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherUserRepo extends JpaRepository<VoucherUserEntity, Long> {
    @Query(value = "select * from voucher_user_entity where voucher_id = ?1 and (user_id is null or user_id in (?2))", nativeQuery = true)
    List<VoucherUserEntity> getListVoucherUserByVoucherIdAndUserIdIn(Long voucherId,
                                                                     List<Long> userIds);
}
