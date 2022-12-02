package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.InputProductEntity;
import com.gogitek.orderecommerce.database.entity.InputProductFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;

public interface InputProductFileRepo extends JpaRepository<InputProductFileEntity, Long> {
    @Query(value = "SELECT COUNT(id) from input_product_entity where status <> 'COMPLETED' AND created >= ?1", nativeQuery = true)
    long countNotCompletedRow(Timestamp createdTime);
}

