package com.example.reserve.models.blocks;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class Quarter {

    @Id
    private String id;
    private String defaultConnectId;
    private List<QuarterList> quarters; // 분기 조건 목록
}
