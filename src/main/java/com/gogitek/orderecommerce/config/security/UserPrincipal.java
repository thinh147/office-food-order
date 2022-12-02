package com.gogitek.orderecommerce.config.security;

import com.gogitek.orderecommerce.common.constant.AccountRole;
import com.gogitek.orderecommerce.common.constant.Gender;
import com.gogitek.orderecommerce.database.entity.common.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private final User user;

    public UserPrincipal(User user) {
        this.user = user;
    }


    public  String getRole() {
        Integer roleInInt = user.getRole();
        if (roleInInt == null) return "";
        return AccountRole.valueOfType(roleInInt).getTypeInStr();
    }

    public String getGender() {
        Integer genderInt = user.getGender();
        if (genderInt == null) return "";
        return Gender.valueOfType(genderInt).getTypeInStr();
    }

    public Long getId() {
        return user.getId();
    }

    public String getName(){
        return user.getName();
    }
    public String getEmail() {
        return user.getEmail();
    }

    public String getPhone() {
        return user.getPhone();
    }

    public Long getPoint() {
        return user.getPoint();
    }

    public Long getCartCount() {
        return user.getCartCount();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(getRole()));
    }

    public User getUser() {
        return this.user;
    }

}
