package com.gogitek.orderecommerce.config.log;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
public class LogHistoryRequest {
    private LogAction action;
    private LogObjectType object;
    private String actionExtend;
    private Object before;
    private Object after;
    private List<ChangeInfo> changeInfoList;
    private String objectId;
    private Long extendId;
    private Long userId;
    private String userName;
    private String userEmail;
    private Integer orderType;
}
