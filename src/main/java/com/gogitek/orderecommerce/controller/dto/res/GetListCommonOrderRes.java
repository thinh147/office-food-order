package com.gogitek.orderecommerce.controller.dto.res;

import com.gogitek.orderecommerce.database.entity.common.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetListCommonOrderRes {
    String id;
    String customerName;
    String customerEmail;
    String customerPhone;
    Integer status;
    String code;
    Double totalPrice;
    Double depositPrice;
    Instant orderDate;
    Integer paymentStatus;
    String address;
    String paymentDate;
    String updatedDate;
    Double remainingAmount;
    Double depositAmount;
    Double depositPercent;
}
