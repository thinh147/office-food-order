package com.gogitek.orderecommerce.config.common.excel;

import com.gogitek.orderecommerce.config.abstracts.GogitekEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

@Getter
@Setter
public class InputProductFile extends GogitekEntity {
    protected String name;

    protected Timestamp created;

    protected Timestamp updated;

    protected Long userId;

    protected int totalRows;

    protected int failure;

    protected int success;

    protected String status;

    protected Long size;

    protected String link;

    protected String invalidRows;

    protected String createdBy;
}
