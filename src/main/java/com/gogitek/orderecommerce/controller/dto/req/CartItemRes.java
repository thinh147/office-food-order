package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemRes {
    Long cartId;
    Long productId;
    String image;
    String productName;
    Double yenPrice;
    Double vndPrice;
    Integer quantity;
    String channel;
    Double percentDiscount;
    String metaData;
    Integer orderType;

    public Double findDiscountPrice(){
        return this.vndPrice*(Math.floor(this.percentDiscount/100));
    }

    public Integer findPoint(){
        return (this.vndPrice == null || this.vndPrice == 0) ? 0 : (int)(this.vndPrice/100);
    }

    public Double findVatPrice(Double vatPercent){
        return Math.ceil(this.vndPrice*vatPercent/100);
    }

    public Double findFinalPrice(Double vatPercent){
        return this.vndPrice - this.findDiscountPrice() + this.findVatPrice(vatPercent);
    }
}
