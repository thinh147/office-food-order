package com.gogitek.orderecommerce.controller.dto.res;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ListCategoryRes {
    private Long id;

    private String title;

    private String channel;

    private Long parentId;
}
