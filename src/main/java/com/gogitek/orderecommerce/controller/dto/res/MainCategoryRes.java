package com.gogitek.orderecommerce.controller.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MainCategoryRes {
    List<ListMainCategoryRes> parents = new ArrayList<>();
    List<ListCategoryRes> children = new ArrayList<>();
}
