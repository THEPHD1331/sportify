package com.sportify.app.service.cart;

import com.sportify.app.entity.CartItem;

public interface CartItemService {

    void addItemToCart(Long cartId, Long productId, int quantity);
    void removeItemFromCart(Long cartId, Long productId);
    void updateItemQuantity(Long cartId, Long productId, int quantity);

    CartItem getCartItemFromCart(Long cartId, Long productId);
}
