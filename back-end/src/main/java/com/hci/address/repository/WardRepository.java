package com.hci.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.hci.address.entity.Ward;

public interface WardRepository extends JpaRepository<Ward, Integer> {
    List<Ward> findByDistrict_DistrictId(Integer districtId);
}
