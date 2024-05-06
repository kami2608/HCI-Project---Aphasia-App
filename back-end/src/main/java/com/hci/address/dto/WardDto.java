package com.hci.address.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class WardDto {
    private Integer wardId;
    private String wardName;
}
