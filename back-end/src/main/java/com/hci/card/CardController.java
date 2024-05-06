package com.hci.card;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/cards")
public record CardController (CardService cardService) {
    // return all cards
    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<?> getCards() {
        log.info("getCards");
        return cardService.getCards();
    }
    // return cards by category id
    @CrossOrigin(origins = "*")
    @GetMapping("/category/{categoryId}")
    ResponseEntity<?> getCardByCategory(@PathVariable Integer categoryId) {
        log.info("getCardByCategory");
        return cardService.getCardByCategory(categoryId);
    }
    // return card by id
    @CrossOrigin(origins = "*")
    @GetMapping("/{cardId}")
    ResponseEntity<?> getCardById(@PathVariable Integer cardId) {
        log.info("getCardById");
        return cardService.getCardById(cardId);
    }
    // get all categories
    @CrossOrigin(origins = "*")
    @GetMapping("/category")
    ResponseEntity<?> getCategories() {
        log.info("getCategories");
        return cardService.getCategories();
    }
    // get all sentences
    @CrossOrigin(origins = "*")
    @GetMapping("/sentence")
    ResponseEntity<?> getSentences() {
        log.info("getSentences");
        return cardService.getSentences();
    }
    
}
