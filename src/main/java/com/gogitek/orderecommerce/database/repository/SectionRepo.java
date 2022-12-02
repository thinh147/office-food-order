package com.gogitek.orderecommerce.database.repository;

import com.gogitek.orderecommerce.database.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepo extends JpaRepository<Section, Long> {

}
