package com.example.reserve.models.blocks;

import com.example.reserve.models.Scenario;
import com.example.reserve.types.BlockType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;


//@Document(collection = "block")
@Data
@Builder
public class Block {
    @Id
    private String id;

    private BlockType type;
    private String name;
    private String description;

    // 공통, END Block 제외
    private String nextId;

    // Block의 위치
    private Double x; // x 좌표
    private Double y; // y 좌표

    //    START,
    //    END,

    //    FREE,
    private FreeBlockInfo freeBlockInfo;
    //    SELECT,
    private SelectBlock selectBlock;

    //    FORM,
    private FormItem formItem;
    //    MESSAGE,
    private MessageBlockInfo messageBlockInfo;
    //    SPLIT,
    private QuarterCondition quarterCondition;

    //    API,
}
