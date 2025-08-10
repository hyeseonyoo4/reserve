package com.example.reserve.services;

import com.example.reserve.dtos.AdminDto;
import com.example.reserve.dtos.BlockDto;
import com.example.reserve.models.Admin;
import com.example.reserve.models.Company;
import com.example.reserve.models.Scenario;
import com.example.reserve.models.User;
import com.example.reserve.models.blocks.Block;
import com.example.reserve.repositories.BlockRepository;
import com.example.reserve.types.BlockType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlockService {
    private final ScenarioService scenarioService;

    public BlockService(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    public List<Block> getBlocksByScenario(String scenarioId) {
        Scenario scenario = scenarioService.getScenarioById(scenarioId);
        return scenario.getBlocks();
    }

    //  추가
    public Block createBlock(String scenarioId, BlockType type, String name, Double x, Double y) {
        Scenario scenario = scenarioService.getScenarioById(scenarioId);
        Block block = Block.builder()
                .id(UUID.randomUUID().toString())
                .type(type)
                .name(name)
                .x(x)
                .y(y)
                .build();
        scenario.getBlocks().add(block);

        scenarioService.saveScenario(scenario);

        // TODO: 실제로 Block이 저장된 후에 ID가 할당되어있는지 확인 필요
        return block;
    }

    private BlockDto convertToDto(Block block) {
        return BlockDto.builder()
                .id(block.getId())
                .name(block.getName())
                .build();
    }
    // 수정
    public Block updateBlock(String scenarioId, String id, BlockDto blockDto) {
        Scenario scenario = scenarioService.getScenarioById(scenarioId);
        Block block = scenario.getBlocks().stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Block not found"));

        block.setName(blockDto.getName());
        block.setDescription(blockDto.getDescription());
        block.setNextId(blockDto.getNextId());
        block.setX(blockDto.getX());
        block.setY(blockDto.getY());
        switch (block.getType()) {
            case FREE:
                block.setFreeBlockInfo(blockDto.getFreeBlockInfo());
                break;
            case SELECT:
                block.setSelectBlock(blockDto.getSelectBlock());
                break;
            case FORM:
                block.setFormItem(blockDto.getFormItem());
                break;
            case MESSAGE:
                block.setMessageBlockInfo(blockDto.getMessageBlockInfo());
                break;
            case SPLIT:
                block.setQuarterCondition(blockDto.getQuarterCondition());
                break;
            case API:
                // TODO: API 블록에 대한 처리 로직 추가 필요
                break;
            case START:
            case END:
                // START와 END 블록은 추가적인 정보가 없으므로 별도의 처리가 필요 없음
                break;
            default:
                throw new RuntimeException("Unsupported block type");
        }

        scenarioService.saveScenario(scenario);
        return block;
    }
    // 삭제
    public void deleteBlock(String scenarioId, String id) {
        Scenario scenario = scenarioService.getScenarioById(scenarioId);
        Block block = scenario.getBlocks().stream()
                .filter(b -> b.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Block not found"));

        scenario.getBlocks().remove(block);
        scenarioService.saveScenario(scenario);
    }
}