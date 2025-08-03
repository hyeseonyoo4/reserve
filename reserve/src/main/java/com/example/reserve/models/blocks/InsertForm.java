package com.example.reserve.models.blocks;

import org.springframework.data.annotation.Id;

import java.util.List;

public class InsertForm {
    @Id
    private String id;

    private String parameterKey;

    private boolean required;

    private List<Bubble> messages;

    //폼 타이틀
    private String formTitle;
    //폼 설명
    private String formDescription;
    //확인버튼명
    private String submitButtonName;
    //취소버튼명
    private String cancleButtonName;

    //폼 아이템(목록)
    private List<FormItem>;
}
