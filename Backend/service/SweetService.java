package com.sweetshop.backend.service;

import com.sweetshop.backend.entity.Sweet;

import java.util.List;

public interface SweetService {

    Sweet addSweet(Sweet sweet);

    List<Sweet> getAllSweets();

    Sweet getSweetById(Long id);
    
    void deleteSweet(Long id);
}
