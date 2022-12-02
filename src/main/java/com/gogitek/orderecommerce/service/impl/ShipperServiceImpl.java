package com.gogitek.orderecommerce.service.impl;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import com.gogitek.orderecommerce.controller.service.ShipperService;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.database.repository.SaleOrderRepo;
import com.gogitek.orderecommerce.service.mapper.OrderMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShipperServiceImpl implements ShipperService {
    OrderMapper orderMapper;
    SaleOrderRepo saleOrderRepo;
    @Override
    public List<OrderRes> findListOrderForShipper() {
        List<SaleOrder> saleOrderList = saleOrderRepo.findByStatusNotContainingAndShipperIdIsNull(1);
        return saleOrderList.stream().map(orderMapper::entityToRes).collect(Collectors.toList());
    }

    @Override
    public void approveSaleOrder(Long orderId) {
        UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        Optional<SaleOrder> order = saleOrderRepo.findById(orderId);
        if(order.isPresent()){
            SaleOrder saleOrder = order.get();
            saleOrder.setShipperId(user.getId());
            saleOrder.setStatus(OrderStatus.TRANSFERING.getValue());
            saleOrderRepo.save(saleOrder);
        }
    }


}
