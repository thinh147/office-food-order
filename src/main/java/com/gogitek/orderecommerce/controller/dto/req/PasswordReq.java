package com.gogitek.orderecommerce.controller.dto.req;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordReq {

    private String oldPassword;

    private String newPassword;

    private String confirmNewPassword;
}
