package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.req.CategoryReq;
import com.gogitek.orderecommerce.controller.dto.req.MainCategoryReq;
import com.gogitek.orderecommerce.controller.dto.res.ListCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import com.gogitek.orderecommerce.database.entity.common.SubCategory;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    SubCategory responseToEntity(ListCategoryRes res);

    ListCategoryRes entityToResponse(SubCategory entity);

    MainCategoryRes entityToResponse(MainCategory entity);

    MainCategory requestToEntity(MainCategoryReq req);

    SubCategory requestToEntity(CategoryReq req);
}
