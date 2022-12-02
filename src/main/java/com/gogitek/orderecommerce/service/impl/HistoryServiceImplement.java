package com.gogitek.orderecommerce.service.impl;

import com.gogitek.orderecommerce.common.constant.OrderType;
import com.gogitek.orderecommerce.config.log.ChangeInfo;
import com.gogitek.orderecommerce.controller.service.HistoryService;
import com.gogitek.orderecommerce.database.repository.PaymentLogRepo;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class HistoryServiceImplement implements HistoryService {
    PaymentLogRepo logRepo;
    private static final Gson gson = new Gson();
    @Override
    public List<ChangeInfo> getListChangeStoryByOrderCodeAndType(String orderCode, Integer orderType) {
        OrderType type = OrderType.valueOfType(orderType);
        Type typeJson = new TypeToken<ArrayList<ChangeInfo>>() {}.getType();
        List<ChangeInfo> changeInfos;
        if(type.equals(OrderType.SALE_ORDER)){
            changeInfos = gson.fromJson(logRepo.getHistoryOfSaleOrder(orderCode, orderType), typeJson);
        }else {
            changeInfos = gson.fromJson(logRepo.getHistoryOfFastOrder(orderCode, orderType), typeJson);
        }
        return changeInfos;
    }
}
