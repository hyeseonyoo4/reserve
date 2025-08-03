package com.example.reserve.models.blocks;

import com.example.reserve.types.ConditionType;
import com.example.reserve.types.FormType;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
public class FormItem {
    @Id
    private String id;

    @Builder.Default
    private FormType formType = FormType.TEXT;

    private String title;
    private String placeholder;
    private boolean required;

    // FormType이 OPTION, RADIO, CHECKBOX일 때 선택지 목록
    private List<FormValue> options;

    private String parameterKey;

    @Builder
    @Data
    public static class FormValue {
        private String displayText; // 표시할 텍스트
        private String value; // 실제 값
    }
}
