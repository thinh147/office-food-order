package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String name;

    private String email;

    private String password;

    private String phone;

    private Integer gender;

    private Instant dateOfBirth;
}
