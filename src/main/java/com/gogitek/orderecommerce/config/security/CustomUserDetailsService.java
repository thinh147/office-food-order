package com.gogitek.orderecommerce.config.security;

import com.gogitek.orderecommerce.exception.ResourceNotFoundException;
import com.gogitek.orderecommerce.database.entity.common.User;
import com.gogitek.orderecommerce.database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmailOrPhone(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + username)
                );

        return new UserPrincipal(user);
    }

}