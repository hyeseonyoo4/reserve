package com.example.reserve.models.blocks;

import com.example.reserve.types.BlockType;
import com.example.reserve.types.ChatDisplayType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;


@Data
@Builder
public class SelectBlock {
    @Id
    private String id;

    private ChatDisplayType type;
    private List<Bubble> bubbles;
}
