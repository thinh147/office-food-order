package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.database.entity.PropertySetting;

import java.util.List;

public interface CommonDao {
    PropertySetting findPropertyById(Long id);

    PropertySetting save(PropertySetting propertySetting);

    List<PropertySetting> findAllPropertySetting();

    PropertySetting findNewestProperty();
}
