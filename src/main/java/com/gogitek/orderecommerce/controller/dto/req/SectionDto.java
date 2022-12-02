package com.gogitek.orderecommerce.controller.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class SectionDto {
    Long id;
    List<String> section1;
    List<String> section2;
    List<String> section3;
}
