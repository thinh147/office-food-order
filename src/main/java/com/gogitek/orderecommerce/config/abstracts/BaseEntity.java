package com.gogitek.orderecommerce.config.abstracts;

import com.gogitek.orderecommerce.config.common.excel.IdentifiableDTO;

public abstract class BaseEntity implements IdentifiableDTO<Long> {
    protected Long id;

    public BaseEntity(){
    }

    public abstract Long getId();

    public void setId(Long id){
        this.id = id;
    }
}
