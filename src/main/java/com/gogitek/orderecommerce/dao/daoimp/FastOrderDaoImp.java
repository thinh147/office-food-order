package com.gogitek.orderecommerce.dao.daoimp;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.GetListCommonOrderReq;
import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.database.converter.FastOrderItemConverter;
import com.gogitek.orderecommerce.database.converter.GetFastOrderInforForPrePaymentConverter;
import com.gogitek.orderecommerce.database.converter.ListCommonOrderConverter;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.FastOrderItem;
import com.gogitek.orderecommerce.database.repository.FastOrderItemRepo;
import com.gogitek.orderecommerce.database.repository.FastOrderRepo;
import com.gogitek.orderecommerce.service.mapper.FastOrderMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FastOrderDaoImp implements FastOrderDao {
    FastOrderRepo fastOrderRepo;

    FastOrderItemRepo fastOrderItemRepo;

    FastOrderMapper fastOrderMapper;

    @Override
    public void save(FastOrder fastOrder) {
        fastOrderRepo.save(fastOrder);
    }

    @Override
    public void saveItems(List<FastOrderItem> items) {
        fastOrderItemRepo.saveAll(items);
    }

    @Override
    @Transactional
    public void saveAll(Collection<FastOrder> fastOrders) {
        fastOrderRepo.saveAll(fastOrders);
    }

    @Override
    public GetFastOrderInforForPrePaymentConverter getInformationForPrePaymentByCode(String code) {
        return fastOrderRepo.getFastOrderInforForPrePaymentByOrderCode(code);
    }

    @Override
    public PaginationPage<FastOrderItemConverter> getListDetailFastOrderItemByCode(String code, Integer page, Integer size) {
        PaginationPage<FastOrderItemConverter> response = new PaginationPage<>();
        Pageable pageable = PageRequest.of(page, size);
        Page<FastOrderItemConverter> converters = fastOrderItemRepo.getListDetailFastOrderItemByCode(code, pageable);
        response.setTotalElements(converters.getTotalElements());
        response.setElements(converters.getContent());
        return response;
    }

    @Override
    public List<FastOrder> findFastOrderByCodeIn(List<String> orderCodes) {
        return fastOrderRepo.findByOrderCodeIn(orderCodes);
    }

    @Override
    public List<FastOrderItem> findFastOrderItemByCode(String code) {
        return fastOrderItemRepo.findByFastOrderCode(code);
    }

    @Override
    public Optional<FastOrder> findFastOrderByCode(String code) {
        return fastOrderRepo.findByOrderCode(code);
    }

    @Override
    public PaginationPage<ListCommonOrderConverter> getListFastOrder(GetListCommonOrderReq req, Long userId) {
        PaginationPage<ListCommonOrderConverter> listConverter = new PaginationPage<>();
        if (req.getStatus() == null) {
            req.setStatus(new ArrayList<>());
        }
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize(), sort);
        Page<ListCommonOrderConverter> converters = fastOrderRepo.getListFastOrder(req.getKey(), req.getOrderDateFrom(),
                req.getOrderDateTo(), req.getStatus(), userId, pageable);
        listConverter.setTotalElements(converters.getTotalElements());
        listConverter.setElements(converters.getContent());
        return listConverter;
    }

    @Override
    public List<FastOrderItem> findListFastOrderItemByIdsIn(List<Long> ids) {
        return fastOrderItemRepo.findByIdIn(ids);
    }

    @Override
    public List<FastOrder> findByGrossCode(String grossCode) {
        return fastOrderRepo.findByGrossCode(grossCode);
    }
}
