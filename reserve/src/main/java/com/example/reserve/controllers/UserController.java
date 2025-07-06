package com.example.reserve.controllers;

import com.example.reserve.models.User;
import com.example.reserve.models.Company;
import com.example.reserve.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // User 저장
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // 특정 Company에 속한 Users 조회
    @GetMapping("/by-company/{companyId}")
    public List<User> getUsersByCompanyId(@PathVariable String companyId) {
        return userService.getUsersByCompanyId(companyId);
    }

    // 특정 User의 Company 조회
    @GetMapping("/{userId}/company")
    public Company getCompanyOfUser(@PathVariable String userId) {
        return userService.getCompanyOfUser(userId);
    }
}