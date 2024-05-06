package com.hci.address.entity;

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
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ward")
@Data
@Builder
public class Ward {
    @Id
    @SequenceGenerator(name = "ward_sequence", sequenceName = "ward_sequence", allocationSize = 1)
    @GeneratedValue(generator = "ward_sequence")
    private Integer wardId;
    private String wardName;
    
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "district_id", referencedColumnName = "districtId")
    private District district;

    @Override
    public String toString() {
        return "Ward{" +
                "wardId=" + wardId +
                ", wardName='" + wardName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Ward ward = (Ward) o;
        return Objects.equals(wardId, ward.wardId) &&
                Objects.equals(wardName, ward.wardName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(wardId, wardName);
    }
}
