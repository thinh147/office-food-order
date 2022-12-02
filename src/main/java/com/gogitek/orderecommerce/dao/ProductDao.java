package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.ProductListReq;
import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.entity.common.Cart;
import com.gogitek.orderecommerce.database.entity.common.Metadata;
import com.gogitek.orderecommerce.database.entity.common.Product;

import java.util.Optional;

import java.util.List;

public interface ProductDao {
    PaginationPage<ProductConverter> getListProduct(ProductListReq req, Integer page, Integer size, Integer sortType);

    void save(Product product);

    void saveAndFlush(Product product, Long categoryId);

    void saveAll(Iterable<Product> products);

    Optional<Product> findById(Long id);

    Optional<ProductConverter> findProductByIdNativeQuery(Long id);

    List<Product> findByIdIn(List<Long> id);
}
