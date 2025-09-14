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

    private String id;  ////////

    private BlockType type; //////////
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
    private InsertForm formInfo;               // FORM
    private MessageBlockInfo messageBlockInfo; // MESSAGE
    private Quarter quarterInfo;               // SPLIT

    public static BlockDto toDto(Block block) {
        return BlockDto.builder()
                .id(block.getId())
                .type(block.getType())
                .name(block.getName())
                .description(block.getDescription())
                .nextId(block.getNextId())
                .x(block.getX())
                .y(block.getY())
                .freeBlockInfo(block.getFreeBlockInfo())
                .selectBlock(block.getSelectBlock())
                .formInfo(block.getFormInfo())
                .messageBlockInfo(block.getMessageBlockInfo())
                .quarterInfo(block.getQuarterInfo())
                .build();
    }

    public static Block toEntity(BlockDto blockDto) {
        Block block = Block.builder()
                .id(blockDto.getId())
                .type(blockDto.getType())
                .name(blockDto.getName())
                .description(blockDto.getDescription())
                .nextId(blockDto.getNextId())
                .x(blockDto.getX())
                .y(blockDto.getY())
                .build();

        switch (block.getType()) {
            case FREE:
                block.setFreeBlockInfo(blockDto.getFreeBlockInfo());
                break;
            case SELECT:
                block.setSelectBlock(blockDto.getSelectBlock());
                break;
            case FORM:
                block.setFormInfo(blockDto.getFormInfo());
                break;
            case MESSAGE:
                block.setMessageBlockInfo(blockDto.getMessageBlockInfo());
                break;
            case SPLIT:
                block.setQuarterInfo(blockDto.getQuarterInfo());
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

        return block;
    }
}
