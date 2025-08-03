package com.example.reserve.models.blocks;

import com.example.reserve.types.ConditionType;
import com.example.reserve.types.FormType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
@Data
@Builder
public class FormItem {
    @Id
    private String id;

    private String parameterKey;

    private String title;

    private String placeholder;


    @Builder.Default
    private FormType formType = FormType.TEXT;

}
