package com.sportify.app.service.cart;

import com.sportify.app.entity.Cart;
import com.sportify.app.entity.User;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.CartItemRepository;
import com.sportify.app.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Author: Paras Dongre
 * Date Created:29-01-2025
 * Time Created:23:03
 */
@Service
@Transactional
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    private final AtomicLong atomicLong = new AtomicLong(0);

    @Override
    public Cart getCart(long id) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found"));
//        cart.setTotalAmount(cart.getTotalAmount());
        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(long id) {

        Cart cart = getCart(id);
        cartItemRepository.deleteAllByCartId(id);
        cart.getCartItems().clear();
        cart.setTotalAmount(0);
        cartRepository.deleteById(id);
    }

    @Override
    public int getTotalPrice(long id) {

        Cart cart = getCart(id);
        return cart.getTotalAmount();
    }

    // Increment counter and return to initialize new Cart (In non-user case)

//    public Long initializeNewCart(){
//        Cart cart = new Cart();
//        long newCartId = atomicLong.incrementAndGet();
//        cart.setId(newCartId);
//        return cartRepository.save(cart).getId();
//    }
    @Override
    public Cart initializeNewCart(User user){
        return Optional.ofNullable(getCartByUserId(user.getId()))
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    @Override
    public Cart getCartByUserId(long id) {

        return cartRepository.findByUserId(id);
    }
}
