package com.gogitek.orderecommerce.database.repo_abstract;

import com.gogitek.orderecommerce.dao.FastOrderDao;
import com.gogitek.orderecommerce.dao.ProductDao;
import com.gogitek.orderecommerce.dao.SaleOrderDao;

public interface Dao {
    SaleOrderDao saleOrder();
    FastOrderDao fastOrder();
    ProductDao product();
}
