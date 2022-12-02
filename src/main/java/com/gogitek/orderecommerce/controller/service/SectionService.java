package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.controller.dto.req.SectionDto;

public interface SectionService {
    SectionDto updateSectionDto(SectionDto dto);
    SectionDto findById(Long id);
}
