package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
public class ProductListReq {
    String key; //key word: để tìm kiếm
    String url; //url để tìm sản phẩm
    Instant updatedAtFrom; // Truyền ngày dạng format iso
    Instant updatedAtTo; // Truyền ngày dạng format iso
    List<String> channel; // List kênh bán: amazon, mercari nói chung cứ truyền chữ vào
    List<String> trademark; // Hãng: adidas, nike, ...
    List<Long> categoryId; // List danh mục, lấy từ api sub category
}
