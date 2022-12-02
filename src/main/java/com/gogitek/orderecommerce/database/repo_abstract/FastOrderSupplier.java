package com.gogitek.orderecommerce.database.repo_abstract;

import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.dao.ProductDao;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FastOrderSupplier implements Dao {
    @Autowired
    FastOrderDao fastOrderDao;

    @Override
    public SaleOrderDao saleOrder() {
        return null;
    }

    @Override
    public FastOrderDao fastOrder() {
        return fastOrderDao;
    }

    @Override
    public ProductDao product() {
        return null;
    }
}
