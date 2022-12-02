package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.controller.dto.PropertyDto;
import com.gogitek.orderecommerce.database.entity.PropertySetting;

import java.util.List;

public interface CommonService {
    PropertyDto settingProperty(PropertyDto dto); //add hay sửa gì thì cx vào đây

    List<PropertyDto> getListPropertySetting();

    PropertySetting getNewestPropertySetting();
}
