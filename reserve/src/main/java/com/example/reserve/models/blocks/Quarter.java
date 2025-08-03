package com.example.reserve.models.blocks;

import org.springframework.data.annotation.Id;

public class Quarter {

    @Id
    private String id;

    private String parameterKey;

    private String blockKey;

    private String answerValue;

    private String nextBlockKey;

}
