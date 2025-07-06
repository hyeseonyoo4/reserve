package com.example.reserve.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class JsonUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        // 객체를 JSON 문자열로 직렬화 시 보기 좋게 포맷팅(Pretty Print) 설정
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
    }

    /**
     * 객체를 JSON 문자열로 직렬화
     *
     * @param object 변환하려는 객체
     * @return JSON 문자열 결과
     */
    public static String toJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            // 변환 실패 시 예외 메시지 반환
            return "Error converting object to JSON: " + e.getMessage();
        }
    }

    /**
     * 객체를 JSON으로 변환하고 System.out에 출력
     *
     * @param object 출력하려는 객체
     */
    public static void printJson(Object object) {
        System.out.println(toJson(object));
    }
}