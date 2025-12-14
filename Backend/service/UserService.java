package com.sweetshop.backend.service;

import com.sweetshop.backend.entity.User;

public interface UserService {

    User registerUser(User user);

    User findByUsername(String username);

    // ✅ NEW METHOD (ADD THIS)
    User login(String username, String password);
}
