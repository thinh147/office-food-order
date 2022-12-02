package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.controller.dto.res.ListCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.ListMainCategoryRes;
import com.gogitek.orderecommerce.controller.dto.res.MainCategoryRes;
import com.gogitek.orderecommerce.dao.CategoryDao;
import com.gogitek.orderecommerce.database.entity.common.Channel;
import com.gogitek.orderecommerce.database.entity.common.MainCategory;
import com.gogitek.orderecommerce.database.entity.common.Product;
import com.gogitek.orderecommerce.database.entity.common.SubCategory;
import com.gogitek.orderecommerce.database.repository.ChannelRepo;
import com.gogitek.orderecommerce.database.repository.MainCategoryRepo;
import com.gogitek.orderecommerce.database.repository.SubCategoryRepo;
import com.gogitek.orderecommerce.service.mapper.CategoryMapper;
import org.hibernate.validator.internal.engine.messageinterpolation.parser.MessageDescriptorFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryDaoImp implements CategoryDao {
    @Autowired
    SubCategoryRepo subCategoryRepo;

    @Autowired
    MainCategoryRepo mainCategoryRepo;

    @Autowired
    ChannelRepo channelRepo;

    @Autowired
    CategoryMapper categoryMapper;
    @Override
    public List<SubCategory> findAll() {
        return subCategoryRepo.findAll();
    }

    @Override
    public List<SubCategory> findByIdIn(List<Long> ids) {
        return subCategoryRepo.findByIdIn(ids);
    }

    @Override
    public SubCategory findById(Long id) {
        Optional<SubCategory> opt = subCategoryRepo.findById(id);
        if(opt.isEmpty()) return null;
        return opt.get();
    }

    @Override
    public void save(SubCategory category) {
        subCategoryRepo.save(category);
    }

    @Override
    @Transactional
    public void save(MainCategory category, String channelName) {
        Optional<Channel> channel = channelRepo.findByName(channelName);
        if(channel.isEmpty()) {
        Channel chanRes = new Channel();
        chanRes.setName(channelName);
        channelRepo.save(chanRes);

        category.setChannelId(chanRes.getId());
        }else {
            category.setChannelId(channel.get().getId());
        }
        mainCategoryRepo.save(category);
    }

    @Override
    @Transactional
    public void saveAndFlush(SubCategory category) {
        try{
            subCategoryRepo.saveAndFlush(category);
        }catch (RuntimeException e){
            throw new MessageDescriptorFormatException("Save not success");
        }
    }

    @Override
    @Transactional
    public void saveAll(Iterable<SubCategory> categories) {
        subCategoryRepo.saveAll(categories);
    }

    @Override
    public List<SubCategory> findByMainCategoryId(Long id) {
        return subCategoryRepo.findByMainCategoryId(id);
    }

    @Override
    public MainCategoryRes findAllMainCategory() {
        List<MainCategory> categoryMain = mainCategoryRepo.findAll();
        List<SubCategory> subCategories = subCategoryRepo.findAll();
        MainCategoryRes resp = new MainCategoryRes();

        resp.getParents().addAll(categoryMain.stream().map(parent -> {
            ListMainCategoryRes res = new ListMainCategoryRes();
            res.setId(parent.getId());
            res.setChannel(parent.getChannelName());
            res.setTitle(parent.getTitle());
            return res;
        }).collect(Collectors.toList()));

        resp.getChildren().addAll(subCategories.stream().map(child -> {
            ListCategoryRes res = new ListCategoryRes();
            res.setId(child.getId());
            res.setTitle(child.getTitle());
            res.setParentId(child.getMainCategoryId());
            res.setChannel(child.getChannel());
            return res;
        }).collect(Collectors.toList()));
        return resp;
    }
}
