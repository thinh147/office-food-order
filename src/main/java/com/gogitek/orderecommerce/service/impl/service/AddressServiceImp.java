package com.gogitek.orderecommerce.service.impl.service;

import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.config.security.UserPrincipal;
import com.gogitek.orderecommerce.controller.dto.req.AddressReq;
import com.gogitek.orderecommerce.controller.dto.res.AddressDto;
import com.gogitek.orderecommerce.controller.service.AddressService;
import com.gogitek.orderecommerce.dao.AddressDao;
import com.gogitek.orderecommerce.database.entity.common.Address;
import com.gogitek.orderecommerce.database.entity.common.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AddressServiceImp implements AddressService {
    AddressDao addressDao;
    @Override
    public AddressDto createAddress(AddressReq addressReq) {
        try {
            UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userDetails.getUser();
            Address address = addressDao.createAddress(addressReq, user);
            AddressDto addressDto = new AddressDto();
            addressDto.setAddressId(address.getAddressId());
            addressDto.setAddress(address.getAddress());
            addressDto.setName(address.getName());
            addressDto.setPhone(address.getPhone());
            return addressDto;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public AddressDto updateAddress(AddressReq addressReq) {
        try {
            UserPrincipal userDetails = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userDetails.getUser();
            Address address = addressDao.updateAddress(addressReq, user);
            AddressDto addressDto = new AddressDto();
            addressDto.setAddressId(address.getAddressId());
            addressDto.setAddress(address.getAddress());
            addressDto.setName(address.getName());
            addressDto.setPhone(address.getPhone());
            return addressDto;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public void deleteAddress(Long id) {
        try {
            addressDao.deleteAddress(id);
        } catch (ConstraintViolationException e) {
            log.error("can not delete this address");
            throw e;
        }
    }

    @Override
    public PaginationPage<AddressDto> getListAddress(Integer page, Integer size) {
        try {
            PaginationPage<Address> saleOrder = addressDao.getListAddress(page, size);
            PaginationPage<AddressDto> result = new PaginationPage<>();
            List<AddressDto> addressDtoList = saleOrder.getElements().stream().map(address -> {
                AddressDto addressDto = new AddressDto();
                addressDto.setAddressId(address.getAddressId());
                addressDto.setAddress(address.getAddress());
                addressDto.setName(address.getName());
                addressDto.setPhone(address.getPhone());
                return addressDto;
            }).collect(Collectors.toList());
            result.setElements(addressDtoList);
            result.setTotalElements(saleOrder.getTotalElements());
            return result;
        } catch (Exception e) {
            throw e;
        }
    }
}
