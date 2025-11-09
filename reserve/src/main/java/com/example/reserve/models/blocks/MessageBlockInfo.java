package com.example.reserve.models.blocks;

import com.example.reserve.types.ChatDisplayType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class MessageBlockInfo {
    @Id
    private String id;

    @Builder.Default
    private ChatDisplayType style = ChatDisplayType.CARD;

    // 슬라이드: N개 가능
    // CARD, TEXT: 1개
    private List<Bubble> messages;
}
