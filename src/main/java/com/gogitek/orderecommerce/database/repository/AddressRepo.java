package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {
}
