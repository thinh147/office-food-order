package com.gogitek.orderecommerce.service.cache;

import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.controller.service.CommonService;
import com.gogitek.orderecommerce.dao.CategoryDao;
import com.gogitek.orderecommerce.database.entity.PropertySetting;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PropertyCache {
    CommonService commonService;

    private static final String PROPERTY_SETTING = "property_setting";
    @Cacheable(value = PROPERTY_SETTING)
    public PropertySetting getPresentSetting(){
        return commonService.getNewestPropertySetting();
    }

    @Scheduled(cron = "0 0 2 * * *") // 1:00 a.m everyday
    @CacheEvict(value = PROPERTY_SETTING, allEntries = true)
    public void clearCache() {
    }
}
