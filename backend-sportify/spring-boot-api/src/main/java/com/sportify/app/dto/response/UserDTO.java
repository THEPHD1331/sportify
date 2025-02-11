package com.sportify.app.dto.response;

import com.sportify.app.entity.Role;

import java.util.Collection;
import java.util.List;

/**
 * Author: Paras Dongre
 * Date Created:31-01-2025
 * Time Created:00:22
 */
public class UserDTO {

    private Long id;
    private String userName;
    private String email;
    private String address;
    private long mobileNo;
    private List<OrderDTO> orders;
    private CartDTO cart;
    private Collection<Role> roles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(long mobileNo) {
        this.mobileNo = mobileNo;
    }

    public List<OrderDTO> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderDTO> orders) {
        this.orders = orders;
    }

    public CartDTO getCart() {
        return cart;
    }

    public void setCart(CartDTO cart) {
        this.cart = cart;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", mobileNo=" + mobileNo +
                ", orders=" + orders +
                ", cart=" + cart +
                ", roles=" + roles +
                '}';
    }
}
