package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.InputProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;

public interface InputProductRepo extends JpaRepository<InputProductEntity, Long> {
}
