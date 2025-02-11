package com.sportify.app.dto.response;

import io.jsonwebtoken.Jwt;

/**
 * Author: Paras Dongre
 * Date Created:03-02-2025
 * Time Created:23:16
 */
public class JwtResponse {

    private long id;
    private String username;
    private String token;

    public JwtResponse(){}
    public JwtResponse(long id, String username, String token) {
        this.id = id;
        this.username = username;
        this.token = token;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}
