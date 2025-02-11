package com.sportify.app.security.user;

import com.sportify.app.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Author: Paras Dongre
 * Date Created:01-02-2025
 * Time Created:23:56
 */
public class CustomUserDetails implements UserDetails {

    private long id;
    private String email;
    private String password;
    private Collection<GrantedAuthority> authorities;

    public CustomUserDetails(){}
    public CustomUserDetails(long id, String email, String password,
                             Collection<GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static CustomUserDetails buildUserDetails(User user){

        List<GrantedAuthority> grantedAuthorities = user.getRoles()
                .stream()
                .map( role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toUnmodifiableList());

        return new CustomUserDetails(user.getId(), user.getEmail(), user.getPassword(), grantedAuthorities);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

}
