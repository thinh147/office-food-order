 package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

 @Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
     @Query(value = "select * from cart where id = ?1 and user_id = ?2", nativeQuery = true)
     Optional<Cart> findByCartIdAndUserId(Long cartId, Long userId);

     @Query(value = "select * from cart where user_id = ?1", nativeQuery = true)
     List<Cart> findByUserId(Long userId);

     @Query(value = "select * from cart where user_id = ?1 and product_id in (?2)", nativeQuery = true)
     List<Cart> findCartByUserAndProductIdIn(Long userId, List<Long> productIds);

     @Modifying
     @Transactional
     @Query(value = "DELETE FROM cart where user_id = ?1 and order_type = ?2 ", nativeQuery = true)
     void deleteAllByUserId(Long userId, Integer orderType);
}
