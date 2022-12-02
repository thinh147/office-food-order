package com.gogitek.orderecommerce.config.excel;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidateCell {
    private String cellTitle;
    private String value;
    private boolean valid;
    private String description;

    public static ValidateCell valid(String cellTitle, String value) {
        return ValidateCell.builder().cellTitle(cellTitle).value(value).valid(true).description("").build();
    }
}
