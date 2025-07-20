package com.example.reserve.services;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.models.Admin;
import com.example.reserve.models.User;
import com.example.reserve.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminDto getAdminById(String id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        return convertToDto(admin);
    }

    public List<AdminDto> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 관리자 추가
    public AdminDto createAdmin(String username, String email) {
        Admin admin = Admin.builder()
                .username(username)
                .email(email)
                .build();

        Admin saved = adminRepository.save(admin);
        return convertToDto(saved);
    }

    // 관리자 수정
    public AdminDto updateAdmin(String id, String username, String email) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        admin.setUsername(username);
        admin.setEmail(email);

        Admin updated = adminRepository.save(admin);
        return convertToDto(updated);
    }
    // 관리자 삭제
    public void deleteAdmin(String id, User loginUser) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("Admin not found");
        }
        adminRepository.deleteById(id);
    }

    private AdminDto convertToDto(Admin admin) {
        return AdminDto.builder()
                .id(admin.getId())
                .username(admin.getUsername())
                .email(admin.getEmail())
                .build();
    }
}
