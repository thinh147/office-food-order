package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelRepo extends JpaRepository<Channel, Long> {
    Optional<Channel> findByName(String name);
}
