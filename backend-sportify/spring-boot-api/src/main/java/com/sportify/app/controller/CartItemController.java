package com.sportify.app.controller;

import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.entity.Cart;
import com.sportify.app.entity.User;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.service.cart.CartItemService;
import com.sportify.app.service.cart.CartService;
import com.sportify.app.service.user.UserService;
import io.jsonwebtoken.JwtException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:12:55
 */
@RestController
@RequestMapping("${api.prefix}/cart-items")
@CrossOrigin(origins = "http://localhost:3000")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper mapper;

    @PostMapping
    public ResponseEntity<ApiResponse> addItemToCart(//@RequestParam Long userId,
                                                     @RequestParam Long productId,
                                                     @RequestParam Integer quantity) {
        try {
//                if (cartId == null) cartId = cartService.initializeNewCart();
            //User user = mapper.map(userService.getUserById(userId), User.class);
            User user = userService.getAuthenticatedUser();
            Cart cart = cartService.initializeNewCart(user);

            cartItemService.addItemToCart(cart.getId(), productId, quantity);
            return ResponseEntity.ok(new ApiResponse("Add Item Success", null));
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/cart/{cartId}/item/{itemId}")
    public ResponseEntity<ApiResponse> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long itemId) {
        cartItemService.removeItemFromCart(cartId, itemId);
        return ResponseEntity.ok(new ApiResponse("Remove Item Success", null));
    }

    @PutMapping("/cart/{cartId}/item/{itemId}")
    public ResponseEntity<ApiResponse> updateItemQuantity(@PathVariable Long cartId,
                                                          @PathVariable Long itemId,
                                                          @RequestParam Integer quantity) {
        cartItemService.updateItemQuantity(cartId, itemId, quantity);
        return ResponseEntity.ok(new ApiResponse("Update Item Success", null));
    }
}
