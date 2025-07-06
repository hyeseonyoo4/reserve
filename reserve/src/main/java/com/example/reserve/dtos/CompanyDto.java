package com.example.reserve.dtos;

import com.example.reserve.models.Company;
import com.example.reserve.types.RetentionPeriod;
import com.example.reserve.types.ServiceType;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class CompanyDto {
    private String id;
    private String name;
    private String businessId;
    private ServiceType serviceType;
    private RetentionPeriod retentionPeriod;

    public static Company fromDto(CompanyDto dto) {
        return Company.builder()
                .id(dto.getId())
                .name(dto.getName())
                .businessId(dto.getBusinessId())
                .serviceType(dto.getServiceType())
                .retentionPeriod(dto.getRetentionPeriod())
                .build();
    }

    public static CompanyDto toDto(Company company) {
        return CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .businessId(company.getBusinessId())
                .serviceType(company.getServiceType())
                .retentionPeriod(company.getRetentionPeriod())
                .build();
    }

    public static List<CompanyDto> toListDto(List<Company> companyList) {
        if(companyList.isEmpty()) return new ArrayList<>();
        return companyList.stream()
                .map(CompanyDto::toDto)
                .toList();
    }
}
