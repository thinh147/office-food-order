package com.gogitek.orderecommerce.config.log;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class LogDifferentBuilder {
    private LogAction action;
    private List<ChangeInfo> changeInfoList;

    public LogDifferentBuilder() {
        this.changeInfoList = new ArrayList<>();
    }

    public void add(ChangeInfo changeInfo) {
        if (changeInfo.getBefore() == null && changeInfo.getAfter() == null) {
            return;
        }

        if (changeInfo.getBefore() != null
                && changeInfo.getAfter() != null
                && changeInfo.getBefore().equals(changeInfo.getAfter())) {
            return;
        }

        changeInfoList.add(changeInfo);
    }

    public void setAction(LogAction action) {
        this.action = action;
    }
}

