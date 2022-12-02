package com.gogitek.orderecommerce.config.log;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeInfo {
    private String column;
    private Object before;
    private Object after;
}
