package com.example.reserve.models.blocks;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;


@Data
@Builder
public class FreeBlockInfo {
    @Id
    private String id;

    private List<Bubble> questions;    //
    private Integer questionCount;
    private Boolean isRepresentative; // 대표질문여부.

    private String parameterKey;
}


// ㅇ 스타일: 질문카드
// ㅇ 버블(질문) – 1개
//     이미지, 텍스트
//     버튼X
//
//     재질문 - 최대 몇번까지 재질문
//
//-> 사용자가 입력한 값을 저장할 파라미터