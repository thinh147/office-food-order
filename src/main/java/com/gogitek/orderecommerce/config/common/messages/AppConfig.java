//package com.gogitek.orderecommerce.config.common.messages;
//
//import org.springframework.context.MessageSource;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.support.ReloadableResourceBundleMessageSource;
//import org.springframework.context.support.ResourceBundleMessageSource;
//
//@Configuration
//public class AppConfig {
//    @Bean
//    public MessageSource messageSourceEn() {
//        ReloadableResourceBundleMessageSource messageSource
//                = new ReloadableResourceBundleMessageSource();
//
//        messageSource.setBasename("classpath:messages_en");
//        messageSource.setDefaultEncoding("UTF-8");
//        return messageSource;
//    }
//
//    @Bean
//    public MessageSource messageSourceVi(){
//        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
//        messageSource.setBasenames("classpath:messages_vi");
//        messageSource.setDefaultEncoding("UTF-8");
//        return messageSource;
//    }
//
//    @Bean
//    public MessageSource messageSource() {
//        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
//        messageSource.setBasename("classpath:messages");
//        return messageSource;
//    }
//}
