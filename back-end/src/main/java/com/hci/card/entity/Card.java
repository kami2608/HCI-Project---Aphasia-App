package com.hci.card.entity;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "card")
@Entity
public class Card {
    @Id
    @SequenceGenerator(name = "card_sequence", sequenceName = "card_sequence", allocationSize = 1)
    @GeneratedValue(generator = "card_sequence")
    private Integer symbolId;
    private String symbol;
    private String wordVi;
    private String wordEn;
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "categoryId")
    @JsonBackReference
    private Category category;
    
    @Override
    public int hashCode() {
        return Objects.hash(symbolId);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Card other = (Card) obj;
        return symbolId != null && symbolId.equals(other.getSymbolId());
    }
}
