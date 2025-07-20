package com.example.reserve.models;

import com.example.reserve.models.samples.Role;
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

    @Indexed
    @Field("company_id")
    private String companyId; // 회사 ID, 외래키로 사용

    private String username;
    private String password;
    private String email;

    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;

    private Role role;

    // TODO - 권한: ADMIN, MANAGER, USER
}


