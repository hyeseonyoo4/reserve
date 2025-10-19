// src/components/node/FreeNode.jsx
import React, {useEffect, useRef} from "react";
import {Handle, Position, useEdgesState, useNodesState} from "@xyflow/react";
import { ImagePlus } from "lucide-react";
import {TargetComponentType, useScenarioEditStore} from "../../store/useScenarioEditStore.js";
import TextArea from "../edit/TextArea.jsx";
import {useScenarioDataStore} from "../../store/useScenarioDataStore.js";
import TextInput from "../edit/TextInput.jsx";

export function FreeNode({ id, data = {}, selected }) {
    const { label, data: nodeData, content, onAdd, onDelete, onImagePick } = data;

    const setNodeData = useScenarioDataStore((s) => s.setNodeData);

    const { currentNode, target, setCurrentNode, setTarget} =
        useScenarioEditStore((s) => s);

    const CARD = "#22c55e";
    const PLATE = "#FFFFFFAA";

    const fileRef = useRef(null);

    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

    const onStartEdit = (type) => {
        setTarget(type);
        setCurrentNode(nodeData?.id);
    };

    const onEditChange = (type, newText) => {
        if (!nodeData) return;
        switch (type) {
            case TargetComponentType.TEXT:
                if(nodeData.freeBlockInfo.question === null) {
                    nodeData.freeBlockInfo.question = { text: '' };
                }
                nodeData.freeBlockInfo.question.text = newText;
                break;
            case TargetComponentType.TITLE:
                // if(nodeData.)
                if(nodeData.name === undefined || nodeData.name === null) {
                    nodeData.name = '';
                }
                nodeData.name = newText;
                break;
            default:
                // break;
                return;
        }

        setNodeData(nodeData.id, nodeData);
    };

    const onEditEnd = () => {
        setTarget(null);
        setCurrentNode(null);
    }

    const openPicker = (e) => {
        e.stopPropagation();
        fileRef.current?.click();               // 숨겨진 input 열기
    };

    const onFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // FlowCanvas에서 주입해줄 콜백으로 위임 (미리보기/업로드/상태업데이트)
        onImagePick?.(id, file);
        // 같은 파일 연속 선택 가능하게 리셋
        e.target.value = "";
    };

    const imgSrc = nodeData?.freeBlockInfo?.question?.imagePath;

    return (
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${CARD}`,
                    borderRadius: 16,
                    background: "#fff",
                    boxShadow: selected
                        ? `0 0 0 4px ${CARD}22, 0 8px 24px rgba(0,0,0,.08)`
                        : "0 8px 24px rgba(0,0,0,.06)",
                    overflow: "hidden",
                }}
            >
                {/* 헤더 */}
                <div
                    style={{
                        padding: "10px 12px",
                        borderBottom: `2px solid ${CARD}`,
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#0f172a",
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {currentNode === nodeData?.id && target === TargetComponentType.TITLE ?
                        (<div style={{display: "flex", gap: 12}}>
                            <span>[{(label || "FREEFORM").toString()}]</span>
                            <TextInput
                                value={nodeData.name}
                                onChange={(newText) => onEditChange(TargetComponentType.TITLE, newText)}
                                onBlur={onEditEnd}
                                placeholder="블록의 타이틀을 입력해주세요"
                                autoFocus
                                style={{
                                    color: "#1f2937", // 텍스트 색상
                                    borderBottom: "1px solid #3b82f6", // 파란색 밑줄 (활성화 강조)
                                    padding: "2px",
                                }}
                            />
                        </div>)
                        :
                        (<div style={{display: "flex", gap: 12}}>
                            <span style={{ whiteSpace: "nowrap" }}>[{(label || "FREEFORM").toString()}]</span>
                            <div style={{flex: 1, display: "flex", alignItems: "center"}} onDoubleClick={() => onStartEdit(TargetComponentType.TITLE)}>
                                {label !== nodeData.name && <span>{nodeData.name || "FREEFORM"}</span>}
                            </div>
                        </div>)
                    }

                    {/* 사진 추가 버튼 */}
                    <button
                        onClick={openPicker}
                        title="사진/파일 추가"
                        style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            padding: 4,
                        }}
                    >
                        <ImagePlus size={18} />
                    </button>

                    {/* 숨겨진 파일 선택기 */}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"            // 파일도 허용하려면 "image/*,.pdf,.doc,.docx" 등으로 변경
                        style={{ display: "none" }}
                        onChange={onFileChange}
                    />
                </div>

                {/* 바디 */}
                <div
                    style={{
                        padding: 12,
                        background: `${CARD}22`,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        gap: 8,
                    }}
                >
                    {imgSrc ? (
                        <img
                            alt="첨부 이미지"
                            src={imgSrc}
                            style={{
                                width: "100%",
                                maxHeight: 160,
                                objectFit: "cover",
                                borderRadius: 12,
                            }}
                        />
                    ) : null}

                    { currentNode === nodeData?.id && target === TargetComponentType.TEXT ? (
                        <div style={{ display: "flex", gap: 8, alignItems: "center"}}>
                            <TextArea
                                value={nodeData?.freeBlockInfo?.question?.text}
                                placeholder="질문을 입력하세요."
                                onChange={(newText) => onEditChange(TargetComponentType.TEXT, newText)}
                                onBlur={onEditEnd}
                                autoFocus
                                rows={6}
                                style={{ border: "2px solid #3b82f6" }} // 추가 스타일 예시 (파란색 테두리)
                            />
                        </div>
                    ) : (
                        <div
                            onDoubleClick={() => onStartEdit(TargetComponentType.TEXT)}
                            style={{
                                background: PLATE,
                                color: "#333",
                                borderRadius: 10,
                                minHeight: 80,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                padding: "12px 16px",
                                whiteSpace: "pre-wrap", // 줄바꿈과 공백 유지
                                textAlign: "left"
                            }}
                        >
                            {nodeData?.freeBlockInfo?.question?.text ?? "질문을 입력하세요."}
                        </div>
                    )}

                </div>

                {/* 푸터 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        background: "#fff",
                    }}
                >
                    <button style={chip} onClick={add}>추가</button>
                    <button style={{ ...chip, borderColor: "#fecaca", color: "#b91c1c" }} onClick={del}>
                        삭제
                    </button>
                </div>
            </div>

            <Handle type="target" position={Position.Top} style={handleStyle} />
            <Handle type="source" position={Position.Bottom} style={handleStyle} />
        </div>
    );
}

const chip = {
    fontSize: 12,
    padding: "6px 10px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,.06)",
};

const handleStyle = {
    width: 8,
    height: 8,
    background: "#111827",
    border: "2px solid #fff",
    boxShadow: "0 0 0 1px rgba(0,0,0,.15)",
    borderRadius: "50%",
    zIndex: 2,
};
