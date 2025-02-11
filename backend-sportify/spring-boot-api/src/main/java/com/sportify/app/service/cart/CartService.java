package com.sportify.app.service.cart;

import com.sportify.app.entity.Cart;
import com.sportify.app.entity.User;

public interface CartService {

    Cart getCart(long id);
    void clearCart(long id);
    int getTotalPrice(long id);
    //Long initializeNewCart();

    Cart initializeNewCart(User user);

    Cart getCartByUserId(long id);
}
