package com.example.reserve.services;

import com.example.reserve.dtos.ManagerDto;
import com.example.reserve.models.Manager;
import com.example.reserve.repositories.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    //ID로 매니저 조회
    public ManagerDto getManagerById(String id) {
        Manager manager = managerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manager not found"));

        return convertToDto(manager);
    }
    //전체 조회
    public List<ManagerDto> getAllManagers() {
        return managerRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    //회사 ID로 조회
    public List<ManagerDto> getManagersByCompanyId(String companyId) {
        return managerRepository.findByCompanyId(companyId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ManagerDto convertToDto(Manager manager) {
        return ManagerDto.builder()
                .id(manager.getId())
                .username(manager.getUsername())
                .email(manager.getEmail())
                .companyId(manager.getCompanyId())
                .build();
    }
}
