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

    private List<Bubble> questions;
    private Integer questionCount;                      /// -> 선택지 블록 이동
    private Boolean isRepresentative; // 대표질문여부.     /// -> 선택지 블록 이동

    // 선택지 목록
//    private List<SelectOption> options;

    // 선택지의 응답을 저장할 시나리오 파라미터 키
    private String parameterKey;
}
