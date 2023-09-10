package com.happysmile.reduce.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ResourcePool {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Date uploadTime;
    @Column
    private Long parentId;
    @Column
    private byte[] resourceContent;
    @Column
    private String resourceName;
    @Column
    private String resourceHashValue;

}
