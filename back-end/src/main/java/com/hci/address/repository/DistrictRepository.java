package com.hci.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.hci.address.entity.*;

public interface DistrictRepository extends JpaRepository<District, Integer> {
    List<District> findByCity_CityId(Integer cityId);
}
