package com.sportify.app.dto.response;

import lombok.*;

/**
 * Author: Paras Dongre
 * Date Created:27-01-2025
 * Time Created:19:29
 */
public class ApiResponse {

    public ApiResponse(String message, Object data) {
        this.message = message;
        this.data = data;
    }
    public ApiResponse(){}

    private String message;
    private Object data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ApiResponse{" +
                "message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
