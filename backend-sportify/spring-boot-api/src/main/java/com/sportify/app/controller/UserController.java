package com.sportify.app.controller;

import com.sportify.app.dto.request.CreateUserRequest;
import com.sportify.app.dto.request.UpdateUserRequest;
import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Author: Paras Dongre
 * Date Created:31-01-2025
 * Time Created:14:05
 */
@RestController
@RequestMapping("${api.prefix}/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers(){

        try {
            return ResponseEntity.ok(new ApiResponse("Success", userService.getAllUsers()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/{userId}/roles")
    public ResponseEntity<ApiResponse> getUserRole(@PathVariable long userId){

        return ResponseEntity.ok(new ApiResponse("success", userService.getUserRoles(userId)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable long userId){

            return ResponseEntity.ok(new ApiResponse("Success", userService.getUserById(userId)));

    }

    @PostMapping
    public ResponseEntity<ApiResponse> createUser(@RequestBody CreateUserRequest userRequest){

            return ResponseEntity.ok(new ApiResponse("Success", userService.createUser(userRequest)));

    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable long userId,
                                                  @RequestBody UpdateUserRequest userRequest){

            return ResponseEntity.ok(new ApiResponse("Success",
                    userService.updateUser(userId, userRequest)));

    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> removeUserById(@PathVariable long userId){

            userService.deleteUser(userId);
            return ResponseEntity.ok(new ApiResponse("User Deleted for Id: "+userId, null));
    }
}
