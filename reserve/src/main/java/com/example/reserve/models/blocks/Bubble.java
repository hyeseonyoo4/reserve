package com.example.reserve.models.blocks;

import com.example.reserve.types.ChatDisplayType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;


//@Document(collection = "block")
@Data
@Builder
public class Bubble {
    @Id
    private String id;

    @Builder.Default
    private ChatDisplayType style = ChatDisplayType.CARD;

    private Integer order;
    private String imagePath;
    private String text;
    private List<Button> buttons; // 버튼 리스트
}
