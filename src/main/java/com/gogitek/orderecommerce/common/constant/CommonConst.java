package com.gogitek.orderecommerce.common.constant;

public enum CommonConst {
    MIN_DEPOSIT(30), DEPOSIT_LEVEL_TWO(50), DEPOSIT_LEVEL_THREE(70), MAX_DEPOSIT(100),
    MAX_AMOUNT_DEPOSIT(5000000);

    private Integer value;
    CommonConst(Integer value) {
        this.value = value;
    }

    public Integer getValue(){
        return this.value;
    }
}
