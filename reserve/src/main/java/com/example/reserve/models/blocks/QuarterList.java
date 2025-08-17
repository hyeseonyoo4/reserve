package com.example.reserve.models.blocks;

import com.example.reserve.types.ConditionType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class QuarterList {
    @Id
    private String id;
    private String name;    // 분기 이름

    private String connectId; // 연결 ID
    @Builder.Default
    private ConditionType conditionType = ConditionType.AND; // 조건 타입 (AND, OR)
    private List<QuarterCondition> conditions; // 분기 조건 목록
}
