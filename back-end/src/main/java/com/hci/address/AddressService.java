package com.hci.address;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hci.address.repository.CityRepository;
import com.hci.address.repository.DistrictRepository;
import com.hci.address.repository.WardRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.stream.Collectors;

import com.hci.address.dto.CityDto;
import com.hci.address.dto.DistrictDto;
import com.hci.address.dto.WardDto;

@Service
@AllArgsConstructor
@Slf4j
public class AddressService {
    private final CityRepository cityRepository;
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;


    public ResponseEntity<?> getAllCity() {
        log.info("get all cities");
        return cityRepository.findAll().isEmpty() ? null
                : ResponseEntity.ok(cityRepository.findAll().stream().map(city -> CityDto.builder().cityId(city.getCityId())
                        .cityName(city.getCityName()).build()).collect(Collectors.toList()));
    }

    public ResponseEntity<?> getDistrictsByCityId(Integer cityId) {
        log.info("get districts by city's id");
        return districtRepository.findByCity_CityId(cityId).isEmpty() ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(districtRepository.findByCity_CityId(cityId).stream().map(district -> DistrictDto.builder()
                        .districtId(district.getDistrictId()).districtName(district.getDistrictName()).build()).collect(Collectors.toList()));
    }

    public ResponseEntity<?> getWardsByDistrictId(Integer districtId) {
        log.info("get wards by district's id");
        return wardRepository.findByDistrict_DistrictId(districtId).isEmpty() ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(wardRepository.findByDistrict_DistrictId(districtId).stream().map(ward -> WardDto.builder()
                        .wardId(ward.getWardId()).wardName(ward.getWardName()).build()).collect(Collectors.toList()));
    }

}
