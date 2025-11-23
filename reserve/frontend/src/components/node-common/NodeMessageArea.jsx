import {TargetComponentType, useScenarioEditStore} from "../../store/useScenarioEditStore.js";
import TextArea from "../edit/TextArea.jsx";
import React, {useEffect, useRef, useState} from "react";

const NodeMessageArea = ({nodeId, text, background, onEditChange, onStartEdit, onEditEnd}) => {
    const { currentNode, target, setCurrentNode, setTarget} =
        useScenarioEditStore((s) => s);

    const wrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // wheel 이벤트 완전 차단
        const handleWheel = (e) => {
            e.stopPropagation();
            e.preventDefault();      // 핵심
            return false;
        };

        wrapper.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            wrapper.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div ref={wrapperRef}
             style={{
                 width: '100%',
                 height: '100%',
                 pointerEvents: 'auto',      // wrapper는 pointer 이벤트 받음
             }}>
            {currentNode === nodeId && target === TargetComponentType.TEXT ? (
                <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                    <TextArea
                        value={text}
                        placeholder="질문을 입력하세요."
                        onChange={(newText) => onEditChange(TargetComponentType.TEXT, newText)}
                        onBlur={onEditEnd}
                        autoFocus
                        rows={12}
                        style={{border: "2px solid #3b82f6", pointerEvents: 'auto'}} // 추가 스타일 예시 (파란색 테두리)
                    />
                </div>
            ) : (
                <div
                    onDoubleClick={() => onStartEdit(TargetComponentType.TEXT)}
                    style={{
                        background,
                        color: "#333",
                        borderRadius: 10,
                        minHeight: 80,
                        maxHeight: 220,
                        overflowY: "auto",
                        display: "flex",
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "8px",
                        whiteSpace: "pre-wrap", // 줄바꿈과 공백 유지
                        textAlign: "left"
                    }}
                >
                    {text ?? "질문을 입력하세요."}
                </div>
            )}
        </div>
    );
}

export default NodeMessageArea;