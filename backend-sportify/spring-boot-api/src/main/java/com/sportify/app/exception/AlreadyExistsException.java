package com.sportify.app.exception;

/**
 * Author: Paras Dongre
 * Date Created:21-12-2024
 * Time Created:19:20
 */
public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String msg) {
        super(msg);
    }
}
