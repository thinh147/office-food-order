package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FacebookLoginRequest {

    private String accessToken;

    private String userId;

    private String email;

    private String name;
}
