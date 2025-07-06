package com.example.project.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;

    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    @Enumerated(EnumType.STRING)
    private RetentionPeriod retentionPeriod; // 3/6/12개월 선택

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}


