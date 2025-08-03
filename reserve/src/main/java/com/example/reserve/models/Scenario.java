package com.example.reserve.models;

import com.example.reserve.models.blocks.Block;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document(collection = "scenario")
@Data
@Builder
public class Scenario {
    @Id
    private String id;

    private String name;
    private String key;
    private Boolean isDraft;
    private Long version;
    private String versionDescription;

    private LocalDateTime createdAt;
    private List<Block> blocks; // 블록 리스트
}
