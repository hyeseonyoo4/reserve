package com.example.reserve.models;

import com.example.reserve.types.RetentionPeriod;
import com.example.reserve.types.ServiceType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "company")
@Data
@Builder
public class Company {
    @Id
    private String id;

    private String name;// 업체명
    @Indexed(unique = true)
    private String businessId;  // 사업자 등록 번호

    private ServiceType serviceType;
    private RetentionPeriod retentionPeriod;
}
