package com.example.reserve.services;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.BlockDto;
import com.example.reserve.models.Admin;
import com.example.reserve.models.Company;
import com.example.reserve.models.User;
import com.example.reserve.models.blocks.Block;
import com.example.reserve.repositories.BlockRepository;
import com.example.reserve.types.BlockType;

import java.util.List;
import java.util.stream.Collectors;

public class BlockService {
    private final BlockRepository blockRepository;

    public BlockService(BlockRepository blockRepository) {
        this.blockRepository = blockRepository;
    }


    public List<BlockDto> getAllBlocks() {
        return blockRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<BlockDto> getBlocksByScenario(String scenarioId) {
        return blockRepository.getBlocksByScenario(scenarioId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    //  추가
    public BlockDto createBlock(String id, String name) {
        Block block = Block.builder()
                .id(id)
                .name(name)
                .build();

        Block saved = blockRepository.save(block); // 여기를 blockRepository로 수정
        return convertToDto(saved);
    }

    private BlockDto convertToDto(Block block) {
        return BlockDto.builder()
                .id(block.getId())
                .name(block.getName())
                .build();
    }
    // 수정
    public BlockDto updateBlock(String id, String name, String scenario) {
        Block block = blockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Block not found"));

        block.setName(name);
        block.setScenario(scenario);
        block.setId(id);

        Block updated = blockRepository.save(block);
        return convertToDto(updated);
    }
    // 삭제
    public void deleteBlock(String id, User loginUser) {
        if (!blockRepository.existsById(id)) {
            throw new RuntimeException("Block not found");
        }
        blockRepository.deleteById(id);
    }

    private BlockDto convertToDto(Block block) {
        return AdminDto.builder()
                .id(block.getId())
                .username(block.getName())
                .scenario(block.getScenario())
                .build();
    }
}