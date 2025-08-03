package com.example.reserve.dtos;

import com.example.reserve.models.Scenario;
import com.example.reserve.models.User;
import com.example.reserve.models.blocks.Block;
import com.example.reserve.types.RetentionPeriod;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class ScenarioDto {
//    @Id
//    private String id;
//
//    private String name;
//    private String key;
//    private Boolean isDraft;
//    private Long version;
//    private String versionDescription;
//
//    private LocalDateTime createdAt;
//    private List<Block> blocks; // 블록 리스트

    @Data
    @Builder
    public static class ScenarioCreateDto {
        private String name;
        private String key;
        private Boolean isDraft;
        private Long version;
        private String versionDescription;
    }

    @Data
    @Builder
    public static class SimpleScenarioDto {
        private String id;
        private String name;
        private String key;
        private Boolean isDraft;
        private Long version;
        private String versionDescription;
        private LocalDateTime createdAt;
        private Long blockCount;
    }

    public static Scenario fromCreateDto(ScenarioCreateDto dto) {
        return Scenario.builder()
                .name(dto.getName())
                .key(dto.getKey())
                .isDraft(dto.getIsDraft())
                .version(dto.getVersion())
                .versionDescription(dto.getVersionDescription())
                .createdAt(LocalDateTime.now()) // 현재 시간으로 설정
                .blocks(new ArrayList<>()) // 빈 블록 리스트로 초기화
                .build();
    }

    public static SimpleScenarioDto toSimpleDto(Scenario scenario) {
        return SimpleScenarioDto.builder()
                .id(scenario.getId())
                .name(scenario.getName())
                .key(scenario.getKey())
                .isDraft(scenario.getIsDraft())
                .version(scenario.getVersion())
                .versionDescription(scenario.getVersionDescription())
                .createdAt(scenario.getCreatedAt())
                .blockCount(scenario.getBlocks() != null ? (long) scenario.getBlocks().size() : 0L)
                .build();
    }



//    // DTO -> Entity 변환
//    public static User fromDto(ScenarioDto dto) {
//        return User.builder()
//                .id(dto.getId())
//                .username(dto.getUsername())
//                .email(dto.getEmail())
//                .companyId(dto.getCompanyId())
//        .build();
//    }
//
//    // Entity -> DTO 변환
//    public static ScenarioDto toDto(User user) {
//        return ScenarioDto.builder()
//                .id(user.getId())
//                .username(user.getUsername())
//                .email(user.getEmail())
//                .companyId(user.getCompanyId())
//                .build();
//    }
//
//    // Entity List -> DTO List 변환
//    public static List<ScenarioDto> toListDto(List<User> userList) {
//        if (userList.isEmpty()) return new ArrayList<>();
//        return userList.stream()
//                .map(ScenarioDto::toDto)
//                .toList();
//    }

}
