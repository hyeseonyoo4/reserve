package com.example.reserve.models.blocks;

import com.example.reserve.types.ButtonActionType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;


//@Document(collection = "block")
@Data
@Builder
public class Button {
    @Id
    private String id;

    private Integer order;
    private String text;

    // Action
    // 1. URL 오픈 -> 메시지
//     2. 파일 다운로드 -> 메시지
    // 3. 채팅상담연결 -> 메시지
    // 4. 질문지 선택 -> 선택
    // 5. 전화연결 -> 메시지
    // 6. 이메일전송 -> 메시지

    // 7. 다른 시나리오 점프 -> 메시지
    private ButtonActionType action;

    // URL오픈 타입인 경우 URL 값
    // 파일 다운로드 타입인 경우 파일 경로
    // 채팅상담연결 타입인 경우 상담사(상담그룹) ID
    // 질문지 선택 타입인 경우 개체ID:표제어ID
        // 커피 - 아메리카노, 라떼
    // 전화연결 타입인 경우 전화번호
    // 이메일 전송 타입인 경우 이메일 주소
    private String actionValue;
}