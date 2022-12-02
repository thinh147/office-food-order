package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import com.gogitek.orderecommerce.database.entity.common.Product;
import com.gogitek.orderecommerce.database.entity.common.SubCategory;

import java.util.List;

public interface CategoryDao {
    List<SubCategory> findAll();

    List<SubCategory> findByIdIn(List<Long> id);

    SubCategory findById(Long id);

    void save(SubCategory category);

    void save(MainCategory mainCategory , String channelName);

    void saveAndFlush(SubCategory category);

    void saveAll(Iterable<SubCategory> categories);

    List<SubCategory> findByMainCategoryId(Long id);

    MainCategoryRes findAllMainCategory();
}
