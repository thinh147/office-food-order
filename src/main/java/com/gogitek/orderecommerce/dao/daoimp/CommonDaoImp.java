package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.dao.CommonDao;
import com.gogitek.orderecommerce.database.entity.PropertySetting;
import com.gogitek.orderecommerce.database.repository.SettingRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommonDaoImp implements CommonDao {

    SettingRepo settingRepo;

    @Override
    public PropertySetting findPropertyById(Long id) {
        Optional<PropertySetting> setting = settingRepo.findById(id);
        if(setting.isEmpty()) throw new MultiLangException(ResultCodes.DATA_EMPTY);
        return setting.get();
    }

    @Override
    @Transactional
    public PropertySetting save(PropertySetting propertySetting) {
        try{
            settingRepo.save(propertySetting);
            return propertySetting;
        }catch (Exception e){
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    @Override
    public List<PropertySetting> findAllPropertySetting() {
        return settingRepo.findAll();
    }

    @Override
    public PropertySetting findNewestProperty() {
        return settingRepo.findNewestProperty();
    }
}
