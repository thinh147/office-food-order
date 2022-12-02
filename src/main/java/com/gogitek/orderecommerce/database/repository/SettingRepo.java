package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.PropertySetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SettingRepo extends JpaRepository<PropertySetting, Long> {
    @Query(value = "select * from property_setting order by updated_at desc limit 1 ", nativeQuery = true)
    PropertySetting findNewestProperty();
}
