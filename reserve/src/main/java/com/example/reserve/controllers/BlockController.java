package com.example.reserve.controllers;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.BlockDto;
import com.example.reserve.dtos.common.ResultEntity;
import com.example.reserve.dtos.common.ResultList;
import com.example.reserve.models.User;
import com.example.reserve.services.BlockService;
import com.example.reserve.types.BlockType;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/blocks")
@RequiredArgsConstructor
public class BlockController {

    private final BlockService blockService;

//    public BlockController(BlockService blockService) {
//        this.blockService = blockService;
//    }
    // 전체 조회
//    @GetMapping
//    public List<BlockDto> getAllBlocks() {
//        return blockService.getAllBlocks();
//    }

    // 시나리오별 조회
    @GetMapping("/scenario/{scenarioId}")
    public ResultEntity<?> getBlocksByScenario(@PathVariable String scenarioId) {
        return ResultEntity.ok(new ResultList<>(blockService.getBlocksByScenario(scenarioId).stream()
                .map(BlockDto::toDto)
                .collect(Collectors.toList())));
    }

    // 일괄 저장
    @PostMapping("/scenario/{scenarioId}")
    public ResultEntity<?> updateBlocks(@PathVariable String scenarioId,
                                        @RequestBody List<BlockDto> blocks) {
        try {
            return ResultEntity.ok(new ResultList<>(blockService.updateBlocks(scenarioId, blocks)
                    .stream()
                    .map(BlockDto::toDto)
                    .toList()));
        } catch (Exception e) {
            return new ResultEntity<>().fail("Error updating blocks: " + e.getMessage());
        }
    }

//    // 생성
//    @PostMapping("/scenario/{scenarioId}")
//    public ResponseEntity<BlockDto> createBlock(
//            @PathVariable String scenarioId,
//            @RequestParam BlockType type,
//            @RequestParam String name,
//            @RequestParam Double x,
//            @RequestParam Double y){
//        return ResponseEntity.ok(BlockDto.toDto(blockService.createBlock(scenarioId, type, name, x, y)));
//    }
//    //  수정
//    @PutMapping("/scenario/{scenarioId}/{id}")
//    public ResponseEntity<BlockDto> updateBlock(
//            @PathVariable String scenarioId,
//            @PathVariable String id,
//            @RequestBody BlockDto blockDto
//            ) {
//        return ResponseEntity.ok(BlockDto.toDto(blockService.updateBlock(scenarioId, id, blockDto)));
//    }
//    // 삭제
//    @DeleteMapping("/scenario/{scenarioId}/{id}")
//    public ResponseEntity<Void> deleteBlock(
//            @PathVariable String scenarioId,
//            @PathVariable String id,
//            HttpSession session) {
//
////        User loginUser = (User) session.getAttribute("loginUser");
////
////        if (loginUser == null) {
////            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
////        }
//
//        blockService.deleteBlock(scenarioId, id);
//        return ResponseEntity.noContent().build();
//    }
}
