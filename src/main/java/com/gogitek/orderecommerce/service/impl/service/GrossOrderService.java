package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.common.constant.OrderStatus;
import com.gogitek.orderecommerce.common.constant.OrderType;
import com.gogitek.orderecommerce.config.common.AutoGenerateCode;
import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderCartRequest;
import com.gogitek.orderecommerce.controller.dto.req.GrossOrderRequest;
import com.gogitek.orderecommerce.controller.dto.res.GrossOrderResponse;
import com.gogitek.orderecommerce.controller.dto.res.OrderRes;
import com.gogitek.orderecommerce.controller.service.FastOrderService;
import com.gogitek.orderecommerce.controller.service.SaleOrderService;
import com.gogitek.orderecommerce.database.entity.FastOrder;
import com.gogitek.orderecommerce.database.entity.Order;
import com.gogitek.orderecommerce.database.entity.SaleOrder;
import com.gogitek.orderecommerce.database.repo_abstract.Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public abstract class GrossOrderService {
    @Autowired
    ApplicationContext context;

    AutoGenerateCode generateCode;

    SaleOrderService saleOrderService;

    FastOrderService fastOrderService;

    public Dao getDao(OrderType orderType) {
        switch (orderType) {
            case SALE_ORDER:
                return (Dao) context.getBean("soDao");
            case FAST_ORDER:
                return (Dao) context.getBean("foDao");
            default:
                throw new MultiLangException(ResultCodes.NOT_SUPPORT);
        }
    }

    @Transactional
    public String createGrossOrder(GrossOrderRequest request) {
        List<String> orderCodes = request.getOrderCodes();
        OrderType orderType = OrderType.valueOfType(request.getOrderType());
        if(orderCodes == null || request.getOrderType() == null) throw new MultiLangException(ResultCodes.DATA_EMPTY);
        Dao dao = getDao(orderType);
        String code = generateCode.generate();
        Order order = new Order();
        order.setOrderCode(code);
        order.setGrossType(orderType.getValue());
        switch (orderType) {
            case SALE_ORDER:
                List<SaleOrder> saleOrders = dao.saleOrder().findByListCodes(orderCodes);
                grossSaleOrder(saleOrders, code);
                break;
            case FAST_ORDER:
                List<FastOrder> fastOrders = dao.fastOrder().findFastOrderByCodeIn(orderCodes);
                grossFastOrder(fastOrders, code);
                break;
        }
        return code;
    }

    public ResponseEntity<?> findGrossOrderByCode(String code, Integer orderType){
        switch (orderType){
            case 1:
                List<OrderRes> so = saleOrderService.getListOrderByGrossCode(code);
                return ResponseEntity.ok(so);
            case 2:
                List<OrderRes> fo = fastOrderService.findFastOrderByGrossCode(code);
                return ResponseEntity.ok(fo);
            default:
                throw new MultiLangException(ResultCodes.NOT_SUPPORT);
        }
    }

    private void grossSaleOrder(List<SaleOrder> saleOrders, String code){
        for(SaleOrder so : saleOrders){
            if(so.canConfirm()) {
                so.setStatus(OrderStatus.MERGING.getValue());
                so.setUpdatedAt(Instant.now());
                so.setGrossCode(code);
            }
        }
        getDao(OrderType.SALE_ORDER).saleOrder().saveAll(saleOrders);
    }

    private void grossFastOrder(List<FastOrder> fastOrders, String code){
        for(FastOrder fo : fastOrders){
            if(fo.canConfirm()) {
                fo.setStatus(OrderStatus.MERGING.getValue());
                fo.setUpdatedAt(Instant.now());
                fo.setGrossCode(code);
            }
        }
        getDao(OrderType.FAST_ORDER).fastOrder().saveAll(fastOrders);
    }

    public GrossOrderResponse createNewGrossOrder(GrossOrderCartRequest request){
        GrossOrderResponse res = new GrossOrderResponse();
        OrderRes soRes = saleOrderService.createNewSaleOrder(request.getSaleOrderReq());
        res.setOrderRes(soRes);
        return res;
    }
}
