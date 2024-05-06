package com.hci.card.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hci.card.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
    List<Category> findAll();
}
