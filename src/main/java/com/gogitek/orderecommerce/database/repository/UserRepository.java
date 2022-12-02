package com.gogitek.orderecommerce.database.repository;
import com.gogitek.orderecommerce.database.entity.common.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User u where u.email = :u or u.phone = :u")
    Optional<User> getUserByEmailOrPhone(@Param("u") String username);

    boolean existsByEmail(String email);

    @Query(value = "select * from users where id = ?1 or email like %?1%", nativeQuery = true)
    List<User> findUserByIdAndEmail(String keySearch);
}
