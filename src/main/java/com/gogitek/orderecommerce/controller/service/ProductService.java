package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.controller.dto.req.CartDto;
import com.gogitek.orderecommerce.controller.dto.req.ProductListReq;
import com.gogitek.orderecommerce.controller.dto.req.ProductReq;
import com.gogitek.orderecommerce.controller.dto.res.ProductDto;
import com.gogitek.orderecommerce.controller.dto.res.ProductListRes;
import com.gogitek.orderecommerce.dao.dto.ProductImportDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    PaginationPage<ProductListRes> getListProduct(ProductListReq req, Integer page, Integer size, Integer sortType);

    ProductListRes save(ProductReq req) throws GogitekException;

    ProductListRes getProductById(Long id) throws GogitekException;

    void deleted(List<Long> ids) throws GogitekException;

//    void saveFileToDatabase(MultipartFile multipartFile);
}
