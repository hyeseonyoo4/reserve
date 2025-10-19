import React, { useEffect, useRef } from "react";

export default function TextInput({
                                      value = "",
                                      placeholder = "텍스트를 입력하세요",
                                      onChange,
                                      onBlur,
                                      style = {},
                                      autoFocus = false, // 자동 포커스 여부
                                  }) {
    const inputRef = useRef(null); // input 요소 참조 생성

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus(); // 컴포넌트 렌더링 후 포커스 활성화
        }
    }, [autoFocus]);

    return (
        <input
            ref={inputRef}
            type="text" // 한 줄 입력
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={(e) => onBlur?.(e)}
            style={{
                width: "100%", // 가로 100% 확장
                border: "none", // 테두리 제거
                background: "transparent", // 배경 투명
                fontSize: "14px", // 기본 텍스트 크기
                color: "#333", // 텍스트 색상
                padding: "8px 12px", // 안쪽 여백
                outline: "none", // 포커스 테두리 제거
                borderBottom: "1px solid #d1d5db", // 하단만 테두리 적용
                borderRadius: "0", // 둥근 모서리 제거
                boxSizing: "border-box", // 패딩 포함 크기 계산
                ...style, // 사용자 정의 스타일 적용
            }}
        />
    );
}
