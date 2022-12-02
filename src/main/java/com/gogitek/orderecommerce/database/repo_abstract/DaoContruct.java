package com.gogitek.orderecommerce.database.repo_abstract;

public class DaoContruct extends NatureDao implements Dao{
    public DaoContruct(Dao dao) {
        this.dao = dao;
    }
}
