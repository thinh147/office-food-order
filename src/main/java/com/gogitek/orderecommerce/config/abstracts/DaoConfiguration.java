package com.gogitek.orderecommerce.config.abstracts;

import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import com.gogitek.orderecommerce.database.repo_abstract.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DaoConfiguration {
    @Bean(name = "soDao")
    public Dao dao(SaleOrderSupplier sqlStore) {
        return new DaoContruct(sqlStore);
    }

    @Bean(name = "foDao")
    public Dao dao(FastOrderSupplier sqlStore) {
        return new DaoContruct(sqlStore);    }

    @Bean(name = "productDao")
    public Dao dao(ProductSupplier sqlStore){
        return new DaoContruct(sqlStore);
    }
}
