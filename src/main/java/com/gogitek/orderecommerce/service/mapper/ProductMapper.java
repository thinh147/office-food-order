package com.gogitek.orderecommerce.service.mapper;

import com.gogitek.orderecommerce.controller.dto.req.ProductReq;
import com.gogitek.orderecommerce.controller.dto.res.ProductListRes;
import com.gogitek.orderecommerce.dao.dto.ProductImportDto;
import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.entity.common.Product;
import org.mapstruct.AfterMapping;
import org.mapstruct.BeforeMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductListRes converterToResponse(ProductConverter converter);
    ProductListRes convertToResponse(Product entity);
    Product dtoToEntity(ProductImportDto dto);
    Product requestToEntity(ProductReq req);
    @AfterMapping
    public default void setCodeToProduct(@MappingTarget Product product, ProductReq req){
        product.setProductCode(req.getCode());
    }
}
