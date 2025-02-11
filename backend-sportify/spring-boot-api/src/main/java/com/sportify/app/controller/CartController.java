package com.sportify.app.controller;

import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.dto.response.CartDTO;
import com.sportify.app.entity.Cart;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.service.cart.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:12:40
 */
@RestController
@RequestMapping("${api.prefix}/carts")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCartById(@PathVariable Long id) {
        Cart cart = cartService.getCart(id);
        return ResponseEntity.ok(new ApiResponse("Success", mapper.map(cart, CartDTO.class)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> clearCart(@PathVariable Long id) {
        cartService.clearCart(id);
        return ResponseEntity.ok(new ApiResponse("Cart Cleared", null));
    }

    @GetMapping("/{id}/total-price")
    public ResponseEntity<ApiResponse> getTotalPrice(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse("Total Price", cartService.getTotalPrice(id)));
    }
    }

