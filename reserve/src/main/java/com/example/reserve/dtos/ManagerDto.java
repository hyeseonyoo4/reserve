package com.example.reserve.dtos;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ManagerDto {
    private String id;
    private String username;
    private String email;
    private String companyId;
}
