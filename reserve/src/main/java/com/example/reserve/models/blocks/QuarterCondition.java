package com.example.reserve.models.blocks;

import com.example.reserve.types.SourceType;
import com.example.reserve.types.TargetType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
@Builder
public class QuarterCondition {
    @Id
    private String id;

    // 파라미터 / 직접입력된 값 인지 타입으로
    private SourceType sourceType;
    private String sourceParameterKey;    // 파라미터 키
    private String sourceInputValue;      // 직접 입력된 값

    // ==, !=, >, <, >=, <=
    // 비교 타입
    private String compareType;

    // 파라미터 / 직접 입력된 값
    private TargetType targetType;
    private String targetParameterKey;    // 파라미터 키
    private String targetInputValue;      // 직접 입력된 값
}
