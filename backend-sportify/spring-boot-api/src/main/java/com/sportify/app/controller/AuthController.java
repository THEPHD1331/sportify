package com.sportify.app.controller;
import com.sportify.app.dto.request.AuthRequest;
import com.sportify.app.dto.response.ApiResponse;
import com.sportify.app.dto.response.JwtResponse;
import com.sportify.app.security.jwt.JwtUtils;
import com.sportify.app.security.user.CustomUserDetails;
import com.sportify.app.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Author: Paras Dongre
 * Date Created:03-02-2025
 * Time Created:23:15
 */

@RestController
@RequestMapping("${api.prefix}/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateTokenForUser(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            JwtResponse jwtResponse = new JwtResponse(userDetails.getId(),
                    userService.getUserById(userDetails.getId()).getUserName(), jwt);

            return ResponseEntity.ok(new ApiResponse("Login Success!", jwtResponse));

        } catch (AuthenticationException e) {
            System.out.println("---Not auth----");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(e.getMessage(), null));
        }

    }
}
