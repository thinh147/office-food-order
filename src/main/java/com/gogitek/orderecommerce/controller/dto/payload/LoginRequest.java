package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
