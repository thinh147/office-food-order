package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubCategoryRepo extends JpaRepository<SubCategory, Long> {
    List<SubCategory> findByIdIn(List<Long> ids);

    @Query(value = "select * from sub_category where main_category_id = ?1",nativeQuery = true)
    List<SubCategory> findByMainCategoryId(Long id);
}
