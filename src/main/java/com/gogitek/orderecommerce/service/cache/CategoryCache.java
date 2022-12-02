package com.gogitek.orderecommerce.service.cache;

import com.gogitek.orderecommerce.controller.dto.res.ListCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.dao.CategoryDao;
import com.gogitek.orderecommerce.service.mapper.CategoryMapper;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryCache {
    CategoryDao categoryDao;
    CategoryMapper categoryMapper;

    private static final String MAIN_CATEGORY = "main_category";
    private static final String SUB_CATEGORY = "sub_category";
    @Cacheable(value = MAIN_CATEGORY)
    public MainCategoryRes findAllMainCategory() {
        return categoryDao.findAllMainCategory();
    }

    @Cacheable(value = SUB_CATEGORY, unless = "#result.getId()==null")
    public ListCategoryRes findById(Long id) {
        return categoryMapper.entityToResponse(categoryDao.findById(id));
    }

    @Scheduled(cron = "0 0 2 * * *") // 1:00 a.m everyday
    @CacheEvict(value = {MAIN_CATEGORY, SUB_CATEGORY}, allEntries = true)
    public void clearCache() {
    }
}
