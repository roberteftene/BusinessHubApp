package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.xml.ws.Service;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "favorite_list")
@Data
public class BusinessFavoriteList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "useraccount_id",referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccount;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private Set<ServiceModel> favoriteBusinesses = new HashSet<>();

    public BusinessFavoriteList() {
    }


}
