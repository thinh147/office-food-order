package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.controller.dto.req.ProductListReq;
import com.gogitek.orderecommerce.dao.ProductDao;
import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.entity.ProductCategoryTracking;
import com.gogitek.orderecommerce.database.entity.common.Metadata;
import com.gogitek.orderecommerce.database.entity.common.Product;
import com.gogitek.orderecommerce.database.repository.CartRepo;
import com.gogitek.orderecommerce.database.repository.ProductMetadataRepo;
import com.gogitek.orderecommerce.database.repository.ProductRepo;
import com.gogitek.orderecommerce.database.repository.ProductTrackingRepository;
import com.gogitek.orderecommerce.service.mapper.CartMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.*;

@Service
@Slf4j
@AllArgsConstructor
public class ProductDaoImp implements ProductDao {
    ProductRepo productRepo;

    JdbcTemplate jdbcTemplate;

    CartRepo cartRepo;

    CartMapper cartMapper;

    ProductTrackingRepository productTrackingRepo;

    ProductMetadataRepo productMetadataRepo;
    @Override
    public PaginationPage<ProductConverter> getListProduct(ProductListReq req, Integer page, Integer size, Integer sortType) {
        PaginationPage<ProductConverter> res = new PaginationPage<>();
        Sort sort;
        switch (sortType) {
            case 1:
                sort = Sort.by("price").descending(); //Sắp theo giá giảm dần
                break;
            case 2:
                sort = Sort.by("price").ascending(); //Sắp theo giá tăng dần
                break;
            case 3:
                sort = Sort.by("created_at").ascending(); //Sắp theo ngày tăng dần
                break;
            case 4:
                sort = Sort.by("created_at").descending(); // Sắp xếp theo ngày giảm dần
                break;
            default:
                sort = Sort.by("id").descending(); // sắp xếp theo id giảm dần (Gần giống với ngày giảm dần)
                break;
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProductConverter> converters =
                productRepo.getListProduct(req.getKey(), req.getUrl(),
                        req.getUpdatedAtFrom(), req.getUpdatedAtTo(),
                        req.getChannel(), req.getTrademark(), req.getCategoryId(), pageable);

        res.setElements(converters.getContent());
        res.setTotalElements(converters.getTotalElements());
        return res;
    }

    @Override
    @Transactional
    public void save(Product product) {
        try {
            productRepo.save(product);
        } catch (RuntimeException e) {
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    @Override
    @Transactional
    public void saveAndFlush(Product product, Long categoryId) {
        try {
            productRepo.save(product);

            if(categoryId != null){
                ProductCategoryTracking tracking = new ProductCategoryTracking();
                tracking.setProductId(product.getId());
                tracking.setCategoryId(categoryId);
                productTrackingRepo.save(tracking);
            }
        } catch (RuntimeException e) {
            log.error(e.getMessage(), e);
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    @Override
    @Transactional
    public void saveAll(Iterable<Product> products) {
        productRepo.saveAll(products);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepo.findById(id);
    }

    @Override
    public Optional<ProductConverter> findProductByIdNativeQuery(Long id) {
        return productRepo.getProductConverterById(id);
    }

    @Override
    public List<Product> findByIdIn(List<Long> ids) {
        return productRepo.findByProductIds(ids);
    }
}
