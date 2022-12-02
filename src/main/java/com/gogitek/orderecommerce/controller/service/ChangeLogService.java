package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.log.LogHistoryRequest;

import java.util.List;

public interface ChangeLogService {
    void logHistory(LogHistoryRequest request);
    void logHistories(List<LogHistoryRequest> requestList);
}
