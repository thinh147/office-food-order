package com.gogitek.orderecommerce.controller.dto.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserGoogleInfo {

    private String googleId;

    private String imageUrl;

    private String email;

    private String name;

    private String giveName;

    private String familyName;

}
