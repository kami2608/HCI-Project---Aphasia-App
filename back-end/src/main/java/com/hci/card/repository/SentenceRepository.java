package com.hci.card.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hci.card.entity.Sentence;

public interface SentenceRepository extends JpaRepository<Sentence, Integer> {
    List<Sentence> findAll();
}
