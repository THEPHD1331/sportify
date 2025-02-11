package com.sportify.app.service.cart;

import com.sportify.app.entity.Cart;
import com.sportify.app.entity.CartItem;
import com.sportify.app.entity.Product;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.CartItemRepository;
import com.sportify.app.repository.CartRepository;
import com.sportify.app.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Author: Paras Dongre
 * Date Created:29-01-2025
 * Time Created:23:41
 */
@Service
@Transactional
public class CartItemServiceImpl implements CartItemService{

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private CartService cartService;
    @Autowired
    private CartRepository cartRepository;

    @Override
    public void addItemToCart(Long cartId, Long productId, int quantity) {
        //1. Get the cart
        //2. Get the product
        //3. Check if the product already in the cart
        //4. If Yes, then increase the quantity with the requested quantity
        //5. If No, then initiate a new CartItem entry.

        Cart cart = cartService.getCart(cartId);
        Product product = productService.getProductById(productId);
        CartItem cartItem = cart.getCartItems()
                .stream()
                .filter(item -> item.getProduct().getId() == (productId))
                .findFirst().orElse(new CartItem());
        if (cartItem.getId() == 0) {
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getProductPrice());
        }
        else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        cartItem.setTotalPrice();
        cart.addItem(cartItem);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long cartId, Long productId) {

        // Get the cart, find the product to be removed from cart else throw exception
        // Remove the item and update the cart.
        Cart cart = cartService.getCart(cartId);
        CartItem cartItem = getCartItemFromCart(cartId, productId);
        cart.removeItem(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void updateItemQuantity(Long cartId, Long itemId, int quantity) {
        Cart cart = cartService.getCart(cartId);

        // Get the cart item and update its details if present
        // Update the total amount and save the cart
            cart.getCartItems().stream()
                .filter(item -> item.getId() == itemId)
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    item.setUnitPrice(item.getProduct().getProductPrice());
                    item.setTotalPrice();
                });

            cart.setTotalAmount(
                    cart.getCartItems()
                    .stream()
                    .map(item -> item.getTotalPrice())
                    .reduce(0, Integer::sum));


            cartRepository.save(cart);
    }

    @Override
    public CartItem getCartItemFromCart(Long cartId, Long productId){
        Cart cart = cartService.getCart(cartId);

        return cart.getCartItems()
                .stream()
                .filter(item -> item.getProduct().getId() == productId)
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart Item Not Found"));
    }
}
