package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.common.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductMetadataRepo extends JpaRepository<Metadata, Long> {
}
