package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.controller.dto.PropertyDto;
import com.gogitek.orderecommerce.controller.service.CommonService;
import com.gogitek.orderecommerce.dao.CommonDao;
import com.gogitek.orderecommerce.database.entity.PropertySetting;
import com.gogitek.orderecommerce.service.cache.PropertyCache;
import com.gogitek.orderecommerce.service.mapper.CommonMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommonServiceImp implements CommonService {
    CommonDao commonDao;

    CommonMapper commonMapper;

    @Override
    @Transactional
    public PropertyDto settingProperty(PropertyDto dto) {
        PropertySetting property = new PropertySetting();

        if(dto.id != null){
            property = commonDao.findPropertyById(dto.id);
            property.setUpdatedAt(Instant.now());
        }else {
            property.setCreatedAt(Instant.now());
        }
        property.setShipFee(dto.shipFee);
        property.setExchangeRate(dto.exchangeRate);
        property.setVatPercent(dto.vatPercent);

        commonDao.save(property);
        return commonMapper.propertyEntityToDto(property);
    }

    @Override
    public List<PropertyDto> getListPropertySetting() {
        List<PropertySetting> listRes = commonDao.findAllPropertySetting();
        if(listRes.isEmpty()) return new ArrayList<>();
        return listRes.stream().map(item -> commonMapper.propertyEntityToDto(item)).collect(Collectors.toList());
    }

    @Override
    public PropertySetting getNewestPropertySetting() {
        return commonDao.findNewestProperty();
    }
}
