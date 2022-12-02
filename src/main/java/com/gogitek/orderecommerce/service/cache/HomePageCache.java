package com.gogitek.orderecommerce.service.cache;

import com.gogitek.orderecommerce.controller.dto.res.ProductListRes;
import com.gogitek.orderecommerce.database.converter.ProductConverter;
import com.gogitek.orderecommerce.database.repository.ProductRepo;
import com.gogitek.orderecommerce.service.mapper.ProductMapper;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HomePageCache {
    ProductRepo productRepo;
    ProductMapper mapper;
    private static final String PRODUCT_CACHE = "product_cache";
    @Cacheable(value = PRODUCT_CACHE)
    public List<ProductListRes> getListProductRandom(Integer limit, String channel){
        List<ProductConverter> products = productRepo.findProductInLimit(limit, channel);
        return products.stream().map(item -> mapper.converterToResponse(item)).collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 3600000)
    @CacheEvict(value = {PRODUCT_CACHE}, allEntries = true)
    public void clearCache() {
    }
}
