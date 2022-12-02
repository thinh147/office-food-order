package com.gogitek.orderecommerce.controller.api;

import com.gogitek.orderecommerce.common.constant.Error;
import com.gogitek.orderecommerce.common.constant.Response;
import com.gogitek.orderecommerce.common.constant.ResultCodes;
import com.gogitek.orderecommerce.config.common.gogitek_response.GogitekResponse;
import com.gogitek.orderecommerce.controller.service.HistoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@AllArgsConstructor
@RequestMapping("/history")
@Slf4j
public class HistoryController {
    HistoryService historyService;
    @GetMapping("/order")
    public Response getListOrderHistory(@RequestParam String orderCode, @RequestParam Integer orderType){
        try{
            return GogitekResponse.ok(historyService.getListChangeStoryByOrderCodeAndType(orderCode, orderType));
        }catch (Exception e){
            log.error(e.getMessage(), e);
            return GogitekResponse.fail(ResultCodes.INTERNAL_SERVER_ERROR, Collections.singletonList(new Error("", "", "")));
        }
    }
}
