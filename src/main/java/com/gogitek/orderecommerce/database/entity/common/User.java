package com.gogitek.orderecommerce.database.entity.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gogitek.orderecommerce.common.constant.AuthProvider;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, length = 20)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "user_name")
    private String userName;

    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "point")
    private Long point;

    @Column(name = "cart_count")
    private Long cartCount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private AuthProvider provider;

    @Column(name = "provider_id")
    private String providerId;

    @Column(name = "gender")
    private Integer gender;

    private Instant dateOfBirth;

    @Column(name = "role")
    private Integer role;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
    private Set<Address> listAddress = new HashSet<>();

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private Collection<Voucher> vouchers;

    public User(Long id){
        this.id = id;
    }
}