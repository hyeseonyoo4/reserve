package com.example.reserve.models.blocks;

import org.springframework.data.annotation.Id;

import java.util.List;

public class InsertForm {
    @Id
    private String id;

    private String parameterKey;

    private boolean required;

    private List<Bubble> messages;
}
