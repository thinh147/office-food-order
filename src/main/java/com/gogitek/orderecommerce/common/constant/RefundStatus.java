package com.gogitek.orderecommerce.common.constant;


public enum RefundStatus {
    REQUESTING(1),
    INPROCESS(2),
    REFUNDEDSUCCESS(3),
    REFUNDEDFAILED(4),
    NOTREFUND(5);

    private Integer status;

    RefundStatus(Integer status) {
        this.status = status;
    }

    public Integer getValue() {
        return this.status;
    }
}

