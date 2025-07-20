package com.example.reserve.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "manager")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Manager {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    private String username;
    private String email;

    private String companyId;

}

