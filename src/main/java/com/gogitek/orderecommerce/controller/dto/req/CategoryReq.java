package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CategoryReq {
    private String name;

    private String title;

    private String description;

    private String channel;

    private Long mainCategoryId;
}
