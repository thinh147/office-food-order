package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GoogleLoginRequest {

    private String accessToken;

    private UserGoogleInfo userGoogleInfo;
}
