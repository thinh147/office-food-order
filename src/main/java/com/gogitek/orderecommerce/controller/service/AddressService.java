package com.gogitek.orderecommerce.controller.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.AddressReq;
import com.gogitek.orderecommerce.controller.dto.res.AddressDto;

public interface AddressService {
    AddressDto createAddress(AddressReq addressReq);

    AddressDto updateAddress(AddressReq addressReq);

    void deleteAddress(Long id);

    PaginationPage<AddressDto> getListAddress(Integer page, Integer size);

}
