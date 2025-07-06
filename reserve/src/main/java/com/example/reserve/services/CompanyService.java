package com.example.reserve.services;

import com.example.reserve.dtos.CompanyDto;
import com.example.reserve.models.Company;
import com.example.reserve.repositories.CompanyRepository;
import com.example.reserve.utils.JsonUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // Company 저장
    public Company saveCompany(CompanyDto companyDto) {
        JsonUtils.printJson(companyDto);
        Company company = Company.builder()
                .name(companyDto.getName())
                .businessId(companyDto.getBusinessId())
                .serviceType(companyDto.getServiceType())
                .retentionPeriod(companyDto.getRetentionPeriod())
                .build();
        return companyRepository.save(company);
    }

    // 모든 Company 조회
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Company 조회
    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElseThrow(() -> 
                new RuntimeException("Company not found with id: " + id));
    }
}