package com.hci.card.entity;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
@Builder
@Table(name = "sentence")
public class Sentence {
    @Id
    @SequenceGenerator(name = "sentence_sequence", sequenceName = "sentence_sequence", allocationSize = 1)
    @Generated(value = "sentence_sequence")
    private Integer sentenceId;
    private String sentence;
    private String imgUrl;
}
