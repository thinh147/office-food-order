package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.ProductCategoryTracking;
import com.gogitek.orderecommerce.database.entity.common.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTrackingRepository extends JpaRepository<ProductCategoryTracking, Long> {
}
