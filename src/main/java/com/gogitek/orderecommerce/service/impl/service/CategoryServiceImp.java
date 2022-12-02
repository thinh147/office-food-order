package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.ChannelList;
import com.gogitek.orderecommerce.config.aws.StorageService;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekException;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.controller.dto.req.CategoryReq;
import com.gogitek.orderecommerce.controller.dto.req.MainCategoryReq;
import com.gogitek.orderecommerce.controller.dto.res.ListCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.controller.service.CategoryService;
import com.gogitek.orderecommerce.dao.CategoryDao;
import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import com.gogitek.orderecommerce.database.entity.common.SubCategory;
import com.gogitek.orderecommerce.database.repository.ChannelRepo;
import com.gogitek.orderecommerce.service.cache.CategoryCache;
import com.gogitek.orderecommerce.service.mapper.CategoryMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImp implements CategoryService {

    CategoryDao categoryDao;

    CategoryMapper categoryMapper;

    StorageService amazonClient;

    ChannelRepo channelRepo;

    CategoryCache categoryCache;

    @Override
    public List<ListCategoryRes> getListSubCategory(Long mainCategoryId) {
        List<SubCategory> subCategories = categoryDao.findByMainCategoryId(mainCategoryId);
        return subCategories.stream().map(item -> categoryMapper.entityToResponse(item)).collect(Collectors.toList());
    }

    @Override
    public List<ListCategoryRes> findByIdIn(List<Long> ids) {
        List<SubCategory> subCategories = categoryDao.findByIdIn(ids);
        return subCategories.stream().map(item -> categoryMapper.entityToResponse(item)).collect(Collectors.toList());
    }

    @Override
    public List<ListCategoryRes> findAll() {
        List<SubCategory> subCategories = categoryDao.findAll();
        return subCategories.stream().map(item -> categoryMapper.entityToResponse(item)).collect(Collectors.toList());
    }

    @Override
    public ListCategoryRes findById(Long id) {
        return categoryCache.findById(id);
    }

    @Override
    public MainCategoryRes findAllMainCategory() {
        return categoryCache.findAllMainCategory();
    }

    @Override
    public void saveMainCategory(MainCategoryReq req) throws GogitekException {
        try{
        MainCategory mainCategory = categoryMapper.requestToEntity(req);
        categoryDao.save(mainCategory, req.getChannel());
        }catch (MultiLangException e){
            throw new MultiLangException(ResultCodes.CANT_SAVE);
        }
    }

    @Override
    public void saveSubCategory(CategoryReq req) throws GogitekException {
        try{
            SubCategory category = categoryMapper.requestToEntity(req);
            category.setCreatedAt(Instant.now());
            category.setUpdatedAt(Instant.now());
            category.setMainCategoryId(req.getMainCategoryId());

            categoryDao.saveAndFlush(category);
        }catch (MultiLangException e){
            throw new RuntimeException(ResultCodes.CANT_SAVE.getMessage());
        }
    }
}
