package com.example.reserve.controllers;

import com.example.reserve.dtos.CompanyDto;
import com.example.reserve.models.Company;
import com.example.reserve.services.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/company")
public class CompanyController {
    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // Company 저장
    @PostMapping
    public CompanyDto createCompany(@RequestBody CompanyDto company) {
        return CompanyDto.toDto(companyService.saveCompany(company));
    }

    @GetMapping
    public List<CompanyDto> getAllCompanies() {
        return CompanyDto.toListDto(companyService.getAllCompanies());
    }

    // Company 조회
    @GetMapping("/{id}")
    public CompanyDto getCompanyById(@PathVariable String id) {
        return CompanyDto.toDto(companyService.getCompanyById(id));
    }
}