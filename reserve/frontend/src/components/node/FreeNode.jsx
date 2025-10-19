// src/components/node/FreeNode.jsx
import React, { useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { ImagePlus } from "lucide-react";

export function FreeNode({ id, data = {}, selected }) {
    const { label, data: nodeData, content, onAdd, onDelete, onImagePick } = data;
    const CARD = "#22c55e";
    const PLATE = "#3b82f6";

    const fileRef = useRef(null);

    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

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
                    <div style={{ display:"flex", gap:12 }}>
                        <span>[{(label || "FREEFORM").toString()}]</span>
                        {label !== content && <span>{content || "FREEFORM"}</span>}
                    </div>

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

                    <div
                        style={{
                            background: PLATE,
                            color: "#fff",
                            borderRadius: 18,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            padding: "12px 16px",
                        }}
                    >
                        {nodeData?.freeBlockInfo?.question?.text ?? "질문을 입력하세요."}
                    </div>
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
