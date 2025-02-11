package com.sportify.app.service.user;

import com.sportify.app.dto.request.CreateUserRequest;
import com.sportify.app.dto.request.UpdateUserRequest;
import com.sportify.app.dto.response.UserDTO;
import com.sportify.app.entity.Role;
import com.sportify.app.entity.User;
import com.sportify.app.exception.AlreadyExistsException;
import com.sportify.app.exception.ResourceNotFoundException;
import com.sportify.app.repository.RoleRepository;
import com.sportify.app.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:23:37
 */
@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

    @Override
    public UserDTO getUserById(long userId) {
        return userRepository.findById(userId)
                .map(user -> modelMapper.map(user, UserDTO.class))
                .orElseThrow(() -> new ResourceNotFoundException("User not Found"));
    }

    @Override
    public User createUser(CreateUserRequest userRequest) {

        return Optional.of(userRequest)
                // Check if email is already in use, else create new user
                .filter(user -> !userRepository.existsByEmail(userRequest.getEmail()))
                .map(request ->{
                    User user = new User();
                    user.setUserName(userRequest.getUserName());
                    user.setEmail(userRequest.getEmail());
                    user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
                    user.setAddress(userRequest.getAddress());
                    user.setMobileNo(userRequest.getMobileNo());

                    // Set Role to user by default
                    Role role = roleRepository.findByName("ROLE_USER").get();
                    user.setRoles(Set.of(role));

                    return userRepository.save(user);
                })
                .orElseThrow(() -> new AlreadyExistsException("User Already Exists"));
    }

    @Override
    public User updateUser(long userId, UpdateUserRequest userRequest) {

        return userRepository.findById(userId)
                .map(existingUser ->{
                    existingUser.setUserName(userRequest.getUserName());
                    existingUser.setAddress(userRequest.getAddress());
                    existingUser.setMobileNo(userRequest.getMobileNo());
                    return userRepository.save(existingUser);
                }).orElseThrow(() -> new ResourceNotFoundException("User not Found"));
    }

    @Override
    public void deleteUser(long userId) {
        userRepository.findById(userId)
                .ifPresentOrElse(user -> userRepository.delete(user),
                        () -> {
                    throw new ResourceNotFoundException("User not Found");
                        });
    }

    @Override
    public User getAuthenticatedUser() {

        // Get Authenticated User from Security context and return it.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        return userRepository.findByEmail(email);
    }

    @Override
    public Collection<Role> getUserRoles(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found"))
                .getRoles();
    }
}
