package com.example.reserve.controllers;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.models.User;
import com.example.reserve.services.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/{id}")
    public ResponseEntity<AdminDto> getAdmin(@PathVariable String id) {
        return ResponseEntity.ok(adminService.getAdminById(id));
    }

    @GetMapping
    public ResponseEntity<List<AdminDto>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    //  관리자 등록
    @PostMapping
    public ResponseEntity<AdminDto> createAdmin(
            @RequestParam String username,
            @RequestParam String email) {
        return ResponseEntity.ok(adminService.createAdmin(username, email));
    }

    //  관리자 수정
    @PutMapping("/{id}")
    public ResponseEntity<AdminDto> updateAdmin(
            @PathVariable String id,
            @RequestParam String username,
            @RequestParam String email) {
        return ResponseEntity.ok(adminService.updateAdmin(id, username, email));
    }
    //관리자 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(
            @PathVariable String id,
            HttpSession session) {

        User loginUser = (User) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        adminService.deleteAdmin(id, loginUser);
        return ResponseEntity.noContent().build();
    }

}
