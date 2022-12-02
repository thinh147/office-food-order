package com.gogitek.orderecommerce;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.scheduling.annotation.EnableAsync;

@ComponentScan("com.gogitek")
@SpringBootApplication(exclude = ContextInstanceDataAutoConfiguration.class)
@PropertySources({
		@PropertySource("classpath:application.yml")
})
@EnableCaching
@EnableAsync
public class OrderEcommerceApplication {
	public static void main(String[] args) {
		SpringApplication.run(OrderEcommerceApplication.class, args);
	}
}
