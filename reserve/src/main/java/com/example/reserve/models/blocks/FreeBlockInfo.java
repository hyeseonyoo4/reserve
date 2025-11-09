package com.example.reserve.models.blocks;

import com.example.reserve.types.ChatDisplayType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;


@Data
@Builder
/**
 * 자유 블록 정보
 * - 사용자가 자유롭게 입력한 값을 저장하는 블록
 */
public class FreeBlockInfo {
    @Id
    private String id;

    @Builder.Default
    private ChatDisplayType style = ChatDisplayType.CARD;

    private Bubble question;     // 질문카드
    private String parameterKey; // 사용자가 입력한 값을 저장할 파라미터 키
}


// ㅇ 스타일: 질문카드
// ㅇ 버블(질문) – 1개
//     이미지, 텍스트
//     버튼X
//
//     재질문 - 최대 몇번까지 재질문
//
//-> 사용자가 입력한 값을 저장할 파라미터


// 선택 블록
// 질문: 원하시는 커피를 선택해주세요.
// 선택지: 아메리카노, 카페라떼, 카푸치노, 바닐라라떼, 카라멜마끼아또, 콜드브루, 에스프레소

// 자유 블록
// 질문: 상담하고 싶은 내용을 자유롭게 입력해주세요.
  //