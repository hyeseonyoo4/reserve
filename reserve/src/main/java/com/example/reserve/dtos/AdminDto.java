package com.example.reserve.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDto {
    private String id;
    private String username;
    private String email;
}
