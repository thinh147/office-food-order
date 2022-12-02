package com.gogitek.orderecommerce.dao;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.AddressReq;
import com.gogitek.orderecommerce.database.entity.common.Address;
import com.gogitek.orderecommerce.database.entity.common.User;

public interface AddressDao {
    Address createAddress(AddressReq addressReq, User user);

    Address updateAddress(AddressReq addressReq, User user);

    void deleteAddress(Long id);

    PaginationPage<Address> getListAddress(Integer page, Integer size);
}
