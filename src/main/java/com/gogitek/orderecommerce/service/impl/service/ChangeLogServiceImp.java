package com.gogitek.orderecommerce.service.impl.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gogitek.orderecommerce.config.log.ChangeInfo;
import com.gogitek.orderecommerce.config.log.LogAction;
import com.gogitek.orderecommerce.config.log.LogHistoryRequest;
import com.gogitek.orderecommerce.controller.service.ChangeLogService;
import com.gogitek.orderecommerce.database.entity.PaymentLog;
import com.gogitek.orderecommerce.database.repository.PaymentLogRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ChangeLogServiceImp implements ChangeLogService {
    PaymentLogRepo paymentLogRepo;

    @Override
    public void logHistory(LogHistoryRequest request) {
        try {
            PaymentLog history = makeLogEntity(request);
            if (history != null)
                paymentLogRepo.save(history);

            log.info("Log merchant portal: data: {}", history);
        } catch (Exception e) {
            log.info("Log merchant portal: error: {}", "" + e);
        }
    }

    @Override
    public void logHistories(List<LogHistoryRequest> requestList) {
        try {
            List<PaymentLog> entities =
                    requestList.stream().map(this::makeLogEntity).collect(Collectors.toList());
            paymentLogRepo.saveAll(entities);
        } catch (Exception e) {
            log.info("Log merchant portal: error: {}", "" + e);
        }
    }

    private PaymentLog makeLogEntity(LogHistoryRequest rq) {
        PaymentLog history = new PaymentLog();
        history.setUserId(rq.getUserId());
        history.setUserName(rq.getUserName());
        history.setObjectId(rq.getObjectId());
        history.setAction(rq.getAction().name());
        history.setExtendId(rq.getExtendId());
        history.setActionExtend(rq.getActionExtend());
        history.setUserEmail(rq.getUserEmail());
        history.setOrderType(rq.getOrderType());

        if (rq.getAction().equals(LogAction.ADD)) {
            if (!CollectionUtils.isEmpty(rq.getChangeInfoList())) {
                history.setChangeInfos(convertObjToString(rq.getChangeInfoList()));
            } else {
                history.setChangeInfos(compareData(rq.getBefore(), rq.getAfter()));
            }
        } else if (rq.getAction().equals(LogAction.UPDATE)) {
            if (!CollectionUtils.isEmpty(rq.getChangeInfoList())) {
                history.setChangeInfos(convertObjToString(rq.getChangeInfoList()));
            } else {
                history.setChangeInfos(compareData(rq.getBefore(), rq.getAfter()));
            }
            if (history.getChangeInfos() == null) return null;

        }
        return history;
    }

    private String convertObjToString(Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    private String compareData(Object before, Object after) {
        List<ChangeInfo> changeInfos = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper().configure(MapperFeature.USE_ANNOTATIONS, true);

        JsonNode bef = mapper.valueToTree(before);
        JsonNode aft = mapper.valueToTree(after);
        Iterator<String> keys = bef.fieldNames();

        String befValue, aftValue, key;
        while (keys.hasNext()) {
            key = keys.next();
            if (key.equalsIgnoreCase("updated"))
                continue;

            if (bef.hasNonNull(key))
                befValue = bef.get(key).toString();
            else
                befValue = null;

            if (aft.hasNonNull(key))
                aftValue = aft.get(key).toString();
            else
                aftValue = null;

            if (aftValue == null && befValue == null)
                continue;
            if (aftValue == null || befValue == null)
                changeInfos.add(new ChangeInfo(key, bef.get(key), aft.get(key)));
            else if (!aftValue.equals(befValue))
                changeInfos.add(new ChangeInfo(key, bef.get(key), aft.get(key)));
        }

        return convertObjToString(changeInfos);
    }
}
