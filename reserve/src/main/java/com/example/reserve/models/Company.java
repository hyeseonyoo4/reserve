package com.example.reserve.models;

import com.example.reserve.types.RetentionPeriod;
import com.example.reserve.types.ServiceType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;

@Document(collection = "company")
public class Company {
    @Id
    private Long id;

    private String name;        // 업체명
    private String businessId;  // 사업자아이디

    private ServiceType serviceType;

    private RetentionPeriod retentionPeriod;

//    @OneToMany(mappedBy = "company")
    private List<User> users;
}
