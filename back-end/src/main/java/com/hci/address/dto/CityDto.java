package com.hci.address.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class CityDto {
    private Integer cityId;
    private String cityName;
}
