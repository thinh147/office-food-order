package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MainCategoryRepo extends JpaRepository<MainCategory, Long> {
}
