package com.gogitek.orderecommerce.dao.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetaDataReq {
    @JsonProperty(value = "configurationName", required = false)
    String configurationName;

    @JsonProperty(value = "options", required = false)
    String options;

    @JsonProperty(value = "quantity", required = false, defaultValue = "0")
    Integer quantity;
}
