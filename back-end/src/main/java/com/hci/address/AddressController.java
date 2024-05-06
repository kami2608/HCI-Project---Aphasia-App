package com.hci.address;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/v1/addresses")
public record AddressController(AddressService addressService) {
    // get all cities
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/cities")
    public ResponseEntity<?> getCities() {
        log.info("getCities");
        return addressService.getAllCity();
    }

    // get districts by city id
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/cities/{cityId}/districts")
    public ResponseEntity<?> getDistrictsByCityId(@PathVariable Integer cityId) {
        log.info("getDistrictsByCityId");
        return addressService.getDistrictsByCityId(cityId);
    }

    // get wards by district id
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/districts/{districtId}/wards")
    public ResponseEntity<?> getWardsByDistrictId(@PathVariable Integer districtId) {
        log.info("getWardsByDistrictId");
        return addressService.getWardsByDistrictId(districtId);
    }
}
