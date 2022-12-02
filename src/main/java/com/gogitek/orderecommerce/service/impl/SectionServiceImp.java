package com.gogitek.orderecommerce.service.impl;

import com.gogitek.orderecommerce.config.common.gogitek_response.MultiLangException;
import com.gogitek.orderecommerce.config.exception.ResultCodes;
import com.gogitek.orderecommerce.controller.dto.req.SectionDto;
import com.gogitek.orderecommerce.controller.service.SectionService;
import com.gogitek.orderecommerce.database.entity.Section;
import com.gogitek.orderecommerce.database.repository.SectionRepo;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SectionServiceImp implements SectionService {
    SectionRepo sectionRepo;
    private final Gson gson = new Gson();
    @Override
    public SectionDto updateSectionDto(SectionDto dto) {
        Section section = new Section();
        if(dto.getId() != null){
            section = sectionRepo.findById(dto.getId()).orElseThrow();
        }
        section.setSection1(gson.toJson(dto.getSection1()));
        section.setSection2(gson.toJson(dto.getSection2()));
        section.setSection3(gson.toJson(dto.getSection3()));
        sectionRepo.save(section);
        dto.setId(section.getId());
        return dto;
    }

    @Override
    public SectionDto findById(Long id) {
        Optional<Section> sectionOpt = sectionRepo.findById(id);
        if(sectionOpt.isEmpty()) throw new MultiLangException(ResultCodes.DATA_EMPTY);
        Section section = sectionOpt.get();
        Type listType = new TypeToken<List<String>>() {}.getType();
        return SectionDto
                .builder()
                .id(id)
                .section1(gson.fromJson(section.getSection1(), listType))
                .section2(gson.fromJson(section.getSection2(), listType))
                .section3(gson.fromJson(section.getSection3(), listType))
                .build();
    }
}
