package com.gogitek.orderecommerce.config.common.gogitek_response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class TranslateServiceImp implements TranslateService, Loggable {
    MessageSource messageSource;

    @Autowired
    public TranslateServiceImp(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public String translate(String content) {
        try {
            return this.messageSource.getMessage(content, (Object[])null, LocaleContextHolder.getLocale());
        } catch (Exception var3) {
            this.getLogger().error("translate {}  has error", content, var3);
            return content;
        }
    }

    public String translateWithArgs(String content, Object... args) {
        try {
            return this.messageSource.getMessage(content, args, LocaleContextHolder.getLocale());
        } catch (Exception var4) {
            this.getLogger().error("translate {}  has error", content, var4);
            return content;
        }
    }

    public String translateWithLang(String lang, String content) {
        try {
            return this.messageSource.getMessage(content, (Object[])null, new Locale(lang));
        } catch (Exception var4) {
            this.getLogger().error("translate {}  has error", content, var4);
            return content;
        }
    }

    public String translateWithLangAndArgs(String lang, String content, Object... args) {
        try {
            return this.messageSource.getMessage(content, args, new Locale(lang));
        } catch (Exception var5) {
            this.getLogger().error("translate {}  has error", content, var5);
            return content;
        }
    }
}
