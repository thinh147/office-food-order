package com.gogitek.orderecommerce.common.constant;

public enum PaymentStatus {
    PENDING(1),
    CONFIRMED(2),
    SUCCESS(3),
    FAILED(4),
    REJECTED(5);

    private Integer value;

    PaymentStatus(Integer value){
        this.value = value;
    }

    public int getValue(){
        return this.value;
    }
}
