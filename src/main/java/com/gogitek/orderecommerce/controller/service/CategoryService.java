package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.controller.dto.req.CategoryReq;
import com.gogitek.orderecommerce.controller.dto.req.MainCategoryReq;
import com.gogitek.orderecommerce.controller.dto.res.ListCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;

import java.util.List;

public interface CategoryService {
    List<ListCategoryRes> getListSubCategory(Long mainCategoryId);

    List<ListCategoryRes> findByIdIn(List<Long> ids);

    List<ListCategoryRes> findAll();

    ListCategoryRes findById(Long id);

    MainCategoryRes findAllMainCategory();

    void saveMainCategory(MainCategoryReq req) throws GogitekException;

    void saveSubCategory(CategoryReq req) throws GogitekException;
}
