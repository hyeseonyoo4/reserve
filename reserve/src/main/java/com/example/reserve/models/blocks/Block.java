package com.example.reserve.models.blocks;

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

//    @Indexed
//    @Field("bot_id")
//    private String bot_id;

    private BlockType type;

    // 공통, END Block 제외
    private String nextId;

    //    START,
    //    END,

    //    SELECT,

    //    FORM,
    //    FREE,
    //    API,
    //    SPLIT,
    //    MESSAGE,

}
