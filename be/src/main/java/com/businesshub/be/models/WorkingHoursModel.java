package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity(name = "working_hours")
@Data
public class WorkingHoursModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer workingID;

    @Column
    private EDaysOfWeek dayOfWeek;

    @Column
    private String startingHour;

    @Column
    private String closeHour;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceId")
    @JsonIgnore
    private ServiceModel serviceModel;

    public WorkingHoursModel(){}

    public WorkingHoursModel(Integer workingID, EDaysOfWeek dayOfWeek, String startingHour, String closeHour) {
        this.workingID = workingID;
        this.dayOfWeek = dayOfWeek;
        this.startingHour = startingHour;
        this.closeHour = closeHour;
    }
}
