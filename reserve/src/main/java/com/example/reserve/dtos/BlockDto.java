package com.example.reserve.dtos;

import com.example.reserve.models.blocks.*;
import com.example.reserve.types.BlockType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlockDto {

    private String id;

    // Scenario는 참조 ID만 보냄
    private String scenarioId;

    private BlockType type;
    private String name;
    private String description;

    // 공통, END Block 제외
    private String nextId;

    // 위치
    private Double x; // x 좌표
    private Double y; // y 좌표

    // 타입별 payload
    private FreeBlockInfo freeBlockInfo;       // FREE
    private SelectBlock selectBlock;           // SELECT
    private FormItem formItem;                 // FORM
    private MessageBlockInfo messageBlockInfo; // MESSAGE
    private QuarterCondition quarterCondition; // SPLIT

}
