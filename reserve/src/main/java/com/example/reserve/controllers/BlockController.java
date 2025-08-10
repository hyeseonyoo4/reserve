package com.example.reserve.controllers;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.BlockDto;
import com.example.reserve.models.User;
import com.example.reserve.services.BlockService;
import com.example.reserve.services.CompanyService;
import com.example.reserve.types.BlockType;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService blockService;

    public BlockController(BlockService blockService) {
        this.blockService = blockService;
    }
    // 전체 조회
    @GetMapping
    public List<BlockDto> getAllBlocks() {
        return blockService.getAllBlocks();
    }

    // 시나리오별 조회
    @GetMapping("/scenario/{scenarioId}")
    public List<BlockDto> getBlocksByScenario(@PathVariable String scenarioId) {
        return blockService.getBlocksByScenario(scenarioId);
    }

    // 생성
    @PostMapping
    public ResponseEntity<AdminDto> createBlock(
            @RequestParam String name,
            @RequestParam String id) {
        return ResponseEntity.ok(blockService.createAdmin(name, id));
    }
    //  수정
    @PutMapping("/{id}")
    public ResponseEntity<BlockDto> updateBlock(
            @PathVariable String id,
            @RequestParam String name,
            @RequestParam String scenarioId) {
        return ResponseEntity.ok(blockService.updateBlock(id, name, scenarioId));
    }
    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlock(
            @PathVariable String id,
            HttpSession session) {

        User loginUser = (User) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        blockService.deleteBlock(id, loginUser);
        return ResponseEntity.noContent().build();
    }
}