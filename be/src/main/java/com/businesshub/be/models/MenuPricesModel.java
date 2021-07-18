package com.businesshub.be.models;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.xml.ws.Service;

@Entity
@Table(name = "service_prices")
@Data
public class MenuPricesModel {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;

    @Lob
    private byte[] data;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "service_id",referencedColumnName = "service_id")
    private ServiceModel serviceModel;

    public MenuPricesModel() {
    }

    public MenuPricesModel(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }
}
