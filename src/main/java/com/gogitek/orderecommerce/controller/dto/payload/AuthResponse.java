package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String email;
    private String name;
    private String phone;
    private String point;
    private String cartCount;

    private String gender;
    private String role;

    private String tokenType = "Bearer";

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public AuthResponse(String accessToken, String email, String name, String phone, String point, String cartCount, String role, String gender) {
        this.accessToken = accessToken;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.point = point;
        this.cartCount = cartCount;
        this.role = role;
        this.gender = gender;
    }
}
