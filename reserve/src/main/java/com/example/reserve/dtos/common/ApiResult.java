package com.example.reserve.dtos.common;

public enum ApiResult {
    SUCCESS("0000", "Success"),
    FAIL("9999", "Fail"),

    UNAUTHORIZED("9401", "Unauthorized"),
    FORBIDDEN("9403", "Forbidden"),
    NOT_FOUND("9404", "Not Found"),
    ;

    public static final String CODE_NOT_FOUND = "1404";
    public static final String CODE_INVALID = "9001";
    public static final String CODE_BAD_REQUEST = "1001";

    private final String code;
    private final String message;

    ApiResult(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public static ApiResult findByCode(String code) {
        for (ApiResult apiResult : ApiResult.values()) {
            if (apiResult.getCode().equals(code)) {
                return apiResult;
            }
        }
        return null;
    }
}
