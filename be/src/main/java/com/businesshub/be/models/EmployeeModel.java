package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "employee")
@Data
public class EmployeeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name= "employee_id")
    private long employeeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "useraccount_id",referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccountModel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", referencedColumnName = "service_id")
    @JsonIgnore
    private ServiceModel serviceModel;

    public EmployeeModel() {
    }

}
