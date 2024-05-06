package com.hci.card.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hci.card.entity.*;

public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findByCategory_CategoryId(Integer categoryId);
    @SuppressWarnings("null")
    List<Card> findAll();
    @SuppressWarnings("null")
    Optional<Card> findById(Integer cardId);
}
