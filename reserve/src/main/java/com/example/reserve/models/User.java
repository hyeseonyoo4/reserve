package com.example.reserve.models;

import com.example.reserve.types.RetentionPeriod;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;


@Document(collection = "user")
@Data
@Builder
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;

    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    private RetentionPeriod retentionPeriod; // 3/6/12개월 선택

    @Indexed
    @Field("company_id")
    private String companyId; // 회사 ID, 외래키로 사용
}


