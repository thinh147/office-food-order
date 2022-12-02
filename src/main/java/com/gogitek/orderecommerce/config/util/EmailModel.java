package com.gogitek.orderecommerce.config.util;

import com.gogitek.orderecommerce.config.aws.Attachment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailModel {
    private String to;
    private String[] cc;
    private String subject;
    private String content;
}
