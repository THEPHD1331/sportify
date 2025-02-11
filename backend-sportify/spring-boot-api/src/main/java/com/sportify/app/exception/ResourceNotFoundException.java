package com.sportify.app.exception;

/**
 * Author: Paras Dongre
 * Date Created:18-12-2024
 * Time Created:21:44
 */
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String message){
        super(message);
    }
}
