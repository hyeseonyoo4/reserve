package com.example.reserve.controllers;

import com.example.reserve.dtos.ManagerDto;
import com.example.reserve.services.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/managers")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerService managerService;

    // ID로 조회
    @GetMapping("/{id}")
    @Deprecated
    public ResponseEntity<ManagerDto> getManager(@PathVariable String id) {
        ManagerDto dto = managerService.getManagerById(id);
        return ResponseEntity.ok(dto);
    }

    // 전체  목록 조회
    @GetMapping
    public ResponseEntity<List<ManagerDto>> getAllManagers() {
        List<ManagerDto> list = managerService.getAllManagers();
        return ResponseEntity.ok(list);
    }

    // 회사 ID로 조회
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<ManagerDto>> getManagersByCompanyId(@PathVariable String companyId) {
        List<ManagerDto> list = managerService.getManagersByCompanyId(companyId);
        return ResponseEntity.ok(list);
    }
}
