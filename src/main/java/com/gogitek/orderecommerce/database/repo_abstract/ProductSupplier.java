package com.gogitek.orderecommerce.database.repo_abstract;

import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.dao.ProductDao;
import com.gogitek.orderecommerce.dao.SaleOrderDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductSupplier implements Dao{
    @Autowired
    ProductDao productDao;

    @Override
    public SaleOrderDao saleOrder() {
        return null;
    }

    @Override
    public FastOrderDao fastOrder() {
        return null;
    }

    @Override
    public ProductDao product() {
        return productDao;
    }
}
