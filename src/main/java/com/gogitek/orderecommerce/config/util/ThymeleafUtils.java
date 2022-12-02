package com.gogitek.orderecommerce.config.util;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class ThymeleafUtils {

    @Autowired
    private SpringTemplateEngine springTemplateEngine;

    private static TemplateEngine engine;

    @PostConstruct
    void init() {
        engine = springTemplateEngine;
    }

    public static String processingTemplate(Object model, String template) {
        Context context = new Context();

        if (Objects.nonNull(model)) {
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("data", model);
            context.setVariables(modelMap);
        }
        return engine.process(template, context);
    }

    public static String processingTemplate(Map<String, Object> modelMap, String template) {
        Context context = new Context();

        if (modelMap != null) {
            context.setVariables(modelMap);
        }
        return engine.process(template, context);
    }
}
