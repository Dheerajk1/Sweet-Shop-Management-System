package com.sweetshop.backend.repository;

import com.sweetshop.backend.entity.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetRepository extends JpaRepository<Sweet, Long> {
}
