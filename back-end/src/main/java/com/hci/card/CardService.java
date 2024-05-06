package com.hci.card;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hci.card.dto.CategoryDto;
import com.hci.card.entity.Card;
import com.hci.card.repository.CardRepository;
import com.hci.card.repository.CategoryRepository;
import com.hci.card.repository.SentenceRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@Service
public class CardService {
    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final SentenceRepository sentenceRepository;

    public ResponseEntity<?> getCardByCategory(Integer categoryId) {
        log.info("getCardByCategory");
        List<Card> cards = cardRepository.findByCategory_CategoryId(categoryId);
        return cards.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(cards);
    }

    public ResponseEntity<?> getCards() {
        log.info("getCards");
        List<Card> cards = cardRepository.findAll();
        return cards.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(cards);
    }

    public ResponseEntity<?> getCardById(Integer cardId) {
        log.info("getCardById");
        return cardRepository.findById(cardId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> getCategories() {
        log.info("getCategories");
        return categoryRepository.findAll().isEmpty() ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(categoryRepository.findAll().stream()
                        .map(category -> CategoryDto.builder().categoryId(category.getCategoryId())
                                .categoryName(category.getCategoryName()).imgUrl(category.getImgUrl()).build())
                        .collect(Collectors.toList()));
    }

    public ResponseEntity<?> getSentences() {
        log.info("getSentences");
        return sentenceRepository.findAll().isEmpty() ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(sentenceRepository.findAll());
    }

}
