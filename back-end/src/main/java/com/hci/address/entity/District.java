package com.hci.address.entity;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "district")
public class District {
    @Id
    @SequenceGenerator(name = "district_sequence", sequenceName = "district_sequence", allocationSize = 1)
    @Generated(value = "district_sequence")
    private Integer districtId;
    private String districtName;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "cityId")
    private City city;

    @JsonManagedReference
    @OneToMany(mappedBy = "district", orphanRemoval = true)
    private Set<Ward> wards;

    @Override
    public String toString() {
        return "District{" +
                "districtId=" + districtId +
                ", districtName='" + districtName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        District district = (District) o;
        return Objects.equals(districtId, district.districtId) &&
                Objects.equals(districtName, district.districtName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(districtId, districtName);
    }
}
