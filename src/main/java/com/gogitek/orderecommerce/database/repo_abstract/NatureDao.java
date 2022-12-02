package com.gogitek.orderecommerce.database.repo_abstract;

import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.dao.ProductDao;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import org.springframework.stereotype.Service;

@Service
public class NatureDao implements Dao {
    protected Dao dao;

    public NatureDao() {
    }

    public NatureDao(Dao dao) {
        this.dao = dao;
    }

    @Override
    public SaleOrderDao saleOrder() {
        return dao.saleOrder();
    }

    @Override
    public FastOrderDao fastOrder() {
        return dao.fastOrder();
    }

    @Override
    public ProductDao product() {
        return dao.product();
    }
}
