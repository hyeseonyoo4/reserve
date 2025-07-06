package com.example.project.entity;

import jakarta.persistence.*;


import java.util.List;


public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // 업체명
    private String businessId;  // 사업자아이디

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    private RetentionPeriod retentionPeriod;

    @OneToMany(mappedBy = "company")
    private List<User> users;


}
