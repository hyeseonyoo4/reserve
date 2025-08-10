package com.example.reserve.repositories;

import com.example.reserve.models.blocks.Block;


import java.util.List;

public interface BlockRepository {
    // 특정 시나리오에 관한 모든 블럭 조회
    List<Block> findById(String id);
    List<Block>getBlocksByScenario(String scenarioId);

}

