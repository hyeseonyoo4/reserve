package com.example.reserve.dtos;

import com.example.reserve.models.User;
import com.example.reserve.types.RetentionPeriod;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class UserDto {
    private String id;
    private String username;
    private String email;
    private RetentionPeriod retentionPeriod;
    private String companyId;

    // DTO -> Entity 변환
    public static User fromDto(UserDto dto) {
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .retentionPeriod(dto.getRetentionPeriod())
                .companyId(dto.getCompanyId())
        .build();
    }

    // Entity -> DTO 변환
    public static UserDto toDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .retentionPeriod(user.getRetentionPeriod())
                .companyId(user.getCompanyId())
                .build();
    }

    // Entity List -> DTO List 변환
    public static List<UserDto> toListDto(List<User> userList) {
        if (userList.isEmpty()) return new ArrayList<>();
        return userList.stream()
                .map(UserDto::toDto)
                .toList();
    }

}
