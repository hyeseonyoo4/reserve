import React, {useEffect, useRef} from "react";

export default function TextArea({
                                     value = "",
                                     placeholder = "질문을 입력하세요.",
                                     onChange,
                                     onBlur,
                                     rows = 4,
                                     cols = 50,
                                     style = {},
                                     autoFocus = false, // 추가된 autoFocus Prop
                                 }) {
    const textAreaRef = useRef(null); // textarea에 대한 ref 생성

    useEffect(() => {
        if (autoFocus && textAreaRef.current) {
            textAreaRef.current.focus(); // 컴포넌트 렌더링 후 포커스 활성화
        }
    }, [autoFocus]);

    return (
        <textarea
            ref={textAreaRef}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={(e) => onBlur?.(e)}
            rows={rows}
            cols={cols}
            style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5db", // 테두리 색상 (연한 회색)
                borderRadius: "8px", // 조금 둥근 모서리
                backgroundColor: "#FFFFFFAA", // 반투명 흰색 배경
                fontSize: "14px",
                color: "#374151", // 텍스트 기본 색상 (어두운 회색)
                resize: "none", // 사용자가 크기 조정 불가능
                outline: "none", // 초점 시 파란 테두리 제거
                overflowY: "auto", // 세로 스크롤
                scrollbarWidth: "thin", // 스크롤바 얇게
                scrollbarColor: "#888 transparent", // 스크롤바 및 트랙 제거
                ...style, // 외부 스타일 추가 (props로 전달)
            }}
        />
    );
}
