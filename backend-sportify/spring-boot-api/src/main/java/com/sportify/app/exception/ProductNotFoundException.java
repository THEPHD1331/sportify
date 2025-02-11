package com.sportify.app.exception;

/**
 * Author: Paras Dongre
 * Date Created:18-12-2024
 * Time Created:21:42
 */
public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String message) {
        super(message);
    }
}
