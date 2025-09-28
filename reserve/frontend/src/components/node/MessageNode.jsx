// src/components/node/MessageNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { typeColors } from "../../utils/types.js";

export function MessageNode({ id, data = {}, selected }) {
    const { label, type, content, onAdd, onDelete } = data;

    // 보라 테두리 + 흰 배경
    const BORDER = typeColors[String(type || "").toUpperCase()] || "#8b5cf6";
    const CARD_BG = "#`${BORDER}22`,";
    const PLATE   = "#3b82f6"; // 메시지 말풍선/얇은 바 색 (파랑 유지)
    const LIGHT_SECTION = `${BORDER}22`; // 연보라(#RRGGBBAA, 약 13% 불투명)

    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

    return (
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${BORDER}`,   // 보라색 테두리
                    borderRadius: 16,
                    background: CARD_BG,             // 카드 배경 흰색
                    boxShadow: selected
                        ? `0 0 0 4px ${BORDER}22, 0 8px 24px rgba(0,0,0,.08)`
                        : "0 8px 24px rgba(0,0,0,.06)",
                    overflow: "hidden",
                }}
            >
                {/* 헤더: 하단 보더도 보라 */}
                <div
                    style={{
                        padding: "10px 12px",
                        borderBottom: `2px solid ${BORDER}`,
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#0f172a",
                    }}
                >
                    {(label || "MESSAGE").toString()}
                </div>

                {/* 바디: 흰 배경 + 파란 말풍선 + 얇은 바 2개 */}
                <div style={{ padding: 12, background: LIGHT_SECTION, textAlign: "center" }}>
                    <div
                        style={{
                            background: PLATE,
                            color: "#fff",
                            borderRadius: 18,
                            height: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            marginBottom: 12,
                        }}
                    >
                        {content || "메시지"}
                    </div>

                    <div style={thinBar}>버튼 정보</div>
                    <div style={{ ...thinBar, marginTop: 8 }}>버튼 +</div>
                </div>

                {/* 하단 전체 폭 버튼(원하면 색 바꿔도 됨) */}
                <button
                    onClick={add}
                    style={{
                        width: "100%",
                        background: "#f9fafb",
                        color: "#111827",
                        fontWeight: 700,
                        padding: "10px 12px",
                        borderTop: "1px solid rgba(0,0,0,.1)",
                        cursor: "pointer",
                    }}
                >
                    버튼 +
                </button>
            </div>

            {/* 핸들 */}
            <Handle type="target" position={Position.Top} style={handleStyle} />
            <Handle type="source" position={Position.Bottom} style={handleStyle} />
        </div>
    );
}

const thinBar = {
    background: "#3b82f6",
    color: "#fff",
    borderRadius: 6,
    padding: "6px 10px",
    textAlign: "center",
    fontWeight: 600,
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
