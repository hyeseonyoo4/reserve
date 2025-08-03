package com.example.reserve.models.blocks;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class MessageBlockInfo {
    @Id
    private String id;
    private List<Bubble> messages;
}
