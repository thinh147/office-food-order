package com.gogitek.orderecommerce.controller.dto.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String email;

    private String fullName;

    private String phone;

    private Instant dateOfBirth;

    private String gender;
}
