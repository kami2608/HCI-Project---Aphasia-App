package com.hci.address.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hci.address.entity.City;

public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findAll();
}
