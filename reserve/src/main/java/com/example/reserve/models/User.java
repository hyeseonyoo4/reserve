package com.example.reserve.models;

import com.example.reserve.types.RetentionPeriod;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "company")
public class User {
    @Id
    private Long id;

    private String username;
    private String password;
    private String email;

    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

//    @Enumerated(EnumType.STRING)
    private RetentionPeriod retentionPeriod; // 3/6/12개월 선택

//    @ManyToOne
//    @JoinColumn(name = "company_id")
    private Company company;
}


