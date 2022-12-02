package com.gogitek.orderecommerce.config.excel;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidateRow {

    private int index;
    private boolean valid;
    private List<ValidateCell> cells;
    private String description;
}
