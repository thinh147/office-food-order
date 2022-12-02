package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.config.abstracts.ExchangeRate;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import com.gogitek.orderecommerce.database.converter.SaleOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.converter.TotalPriceOrderConverter;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.entity.SaleOrderItem;
import com.gogitek.orderecommerce.database.repository.SaleOrderRepo;
import com.gogitek.orderecommerce.database.repository.SettingRepo;
import com.gogitek.orderecommerce.database.repository.SaleOrderItemRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class SaleOrderDaoImp extends ExchangeRate implements SaleOrderDao {
    SaleOrderRepo saleOrderRepo;

    PlatformTransactionManager transactionManager;

    SettingRepo settingRepo;
    SaleOrderItemRepo saleOrderItemRepo;

    @Override
    public PaginationPage<ListCommonOrderConverter> getListSaleOrder(String key, String orderDateFrom, String orderDateTo, List<Integer> status, Integer page, Integer size, Long userId) {
        if(status == null || status.isEmpty()){
            status = new ArrayList<>();
        }
        PaginationPage<ListCommonOrderConverter> result = new PaginationPage<>();
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ListCommonOrderConverter> listConverters = saleOrderRepo.getListSaleOrder(key, orderDateFrom, orderDateTo, status, userId, pageable);
        result.setTotalElements(listConverters.getTotalElements());
        result.setElements(listConverters.getContent());
        return result;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveOrder(SaleOrder saleOrder) {
        try{
            saleOrderRepo.save(saleOrder);
        }catch (Exception e){
            log.error(e.getMessage(),e);

        }
    }

    @Override
    public void saveAllItem(Iterable<SaleOrderItem> items){
        saleOrderItemRepo.saveAll(items);
    }

    @Override
    public PaginationPage<SaleOrderItemConverter> getSaleOrderDetail(String orderCode, Integer page, Integer size) {
        PaginationPage<SaleOrderItemConverter> res = new PaginationPage<>();
        Pageable pageable = PageRequest.of(page, size);
        Page<SaleOrderItemConverter> converters = saleOrderItemRepo.getListSaleOrderItemByOrderCode(orderCode, pageable);
        res.setElements(converters.getContent());
        res.setTotalElements(converters.getTotalElements());
        return res;
    }

    @Override
    public TotalPriceOrderConverter getTotalPriceForOrderDetail(String code) {
        return saleOrderRepo.getDetailPriceConverterForOrderByCode(code);
    }

    @Override
    public SaleOrder findSaleOrderByCode(String code) {
        Optional<SaleOrder> saleOrder = saleOrderRepo.findByOrderCode(code);
        return saleOrder.orElse(null);
    }

    @Override
    public List<SaleOrderItem> findSaleOrderItemByCode(String code) {
        return saleOrderItemRepo.findBySaleOrderCode(code);
    }

    @Override
    public Page<SaleOrder> findAllSaleOrderByPage(Pageable pageable) {
        return saleOrderRepo.findAll(pageable);
    }

    @Override
    public void saveAll(Iterable<SaleOrder> saleOrders) {
        saleOrderRepo.saveAll(saleOrders);
    }

    @Override
    public List<SaleOrder> findByListCodes(List<String> orderCodes) {
        return saleOrderRepo.findByOrderCodeIn(orderCodes);
    }

    @Override
    public List<SaleOrderItem> findByListIds(List<Long> ids) {
        return saleOrderItemRepo.findByIdIn(ids);
    }

    @Override
    public List<SaleOrder> findByGrossCode(String grossCode) {
        return saleOrderRepo.findByGrossCode(grossCode);
    }
}
