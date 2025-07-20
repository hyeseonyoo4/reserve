package com.example.reserve.models;

import com.example.reserve.types.Role;
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

    // TODO - 권한: COMPANY_ADMIN, MANAGER, USER /// SYSTEM_ADMIN
}

/*
1. 일반 유저
    - id: ~~~
    - companyId: "CompanyId" // 회사 ID, 외래키로 사용
    - username: "user1"
    - password: "hashed_password" // 비밀번호는 해시로 저장
    - email: "aaa@email.com"
    - role: Role.USER // 일반 유저 권한

2. 회사 관리자
    - id: ~~~
    - companyId: "CompanyId" // 회사 ID, 외래키로 사용
    - username: "admin1"
    - password: "hashed_password" // 비밀번호는 해시로 저장
    - email: "bbb@email.com"
    - role: Role.ADMIN // 관리자 권한

3. 매니저
    - id: ~~~
    - companyId: "CompanyId" // 회사 ID, 외래키로 사용
    - username: "manager1"
    - password: "hashed_password" // 비밀번호는 해시로 저장
    - email: "ccc@email.com"
    - role: Role.MANAGER // 매니저 권한

4. 시스템 관리자
    - id: ~~~
    - companyId: null // 시스템 관리자이므로 회사 ID 없음
    - username: "sysadmin"
    - password: "hashed_password" // 비밀번호는 해시로 저장
    - email: "ddd@email.com"
    - role: Role.SYSTEM_ADMIN // 시스템 관리자 권한
 */


