package com.gogitek.orderecommerce.dao.daoimp;

import com.amazonaws.services.kms.model.NotFoundException;
import com.gogitek.orderecommerce.config.common.gogitek_pagination.PaginationPage;
import com.gogitek.orderecommerce.controller.dto.req.AddressReq;
import com.gogitek.orderecommerce.dao.AddressDao;
import com.gogitek.orderecommerce.database.entity.common.Address;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.database.repository.AddressRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class AddressDaoImp implements AddressDao {
    AddressRepo addressRepo;

    @Override
    @Transactional
    public Address createAddress(AddressReq addressReq, User user) {
        try {
            Address address = new Address();
            address.setAddress(addressReq.getAddress());
            address.setUser(user);
            address.setName(addressReq.getName());
            address.setPhone(addressReq.getPhone());
            addressRepo.save(address);
            return address;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    @Transactional
    public Address updateAddress(AddressReq addressReq, User user) {
        try {
            Address address = addressRepo.findById(addressReq.getId()).get();
            address.setAddress(addressReq.getAddress());
            address.setUser(user);
            address.setName(addressReq.getName());
            address.setPhone(addressReq.getPhone());
            addressRepo.save(address);
            return address;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {
        try {
            addressRepo.deleteById(id);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public PaginationPage<Address> getListAddress(Integer page, Integer size) {
        try {
            PaginationPage<Address> result = new PaginationPage<>();
            Pageable pageable = PageRequest.of(page, size);
            Page<Address> addresses = addressRepo.findAll(pageable);
            result.setElements(addresses.getContent());
            result.setTotalElements(addresses.getTotalElements());
            return result;
        } catch (NotFoundException e) {
            throw e;
        }
    }
}
