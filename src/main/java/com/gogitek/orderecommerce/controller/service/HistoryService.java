package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.log.ChangeInfo;

import java.util.List;

public interface HistoryService {
    List<ChangeInfo> getListChangeStoryByOrderCodeAndType(String orderCode, Integer orderType);
}
