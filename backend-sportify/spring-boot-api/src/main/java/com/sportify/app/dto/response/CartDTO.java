package com.sportify.app.dto.response;

import java.math.BigDecimal;
import java.util.Set;

/**
 * Author: Paras Dongre
 * Date Created:31-01-2025
 * Time Created:14:27
 */
public class CartDTO {

    private Long cartId;
    private Set<CartItemDTO> items;
    private int totalAmount;

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Set<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(Set<CartItemDTO> items) {
        this.items = items;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public String toString() {
        return "CartDTO{" +
                "cartId=" + cartId +
                ", items=" + items +
                ", totalAmount=" + totalAmount +
                '}';
    }
}
