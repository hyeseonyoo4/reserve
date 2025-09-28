// src/components/node/FreeNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { ImagePlus, Image } from "lucide-react";

export function FreeNode({ id, data = {}, selected }) {
    const { label, data: nodeData, content, onAdd, onDelete } = data;

    const CARD = "#22c55e";   // FREE 메인색(초록)
    const PLATE = "#3b82f6";  // 메시지 판 색 (파랑)

    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

    return (
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${CARD}`,     // 두 번째 스샷처럼 테두리만 컬러
                    borderRadius: 16,
                    background: "#fff",              // 카드 배경은 흰색
                    boxShadow: selected
                        ? `0 0 0 4px ${CARD}22, 0 8px 24px rgba(0,0,0,.08)`
                        : "0 8px 24px rgba(0,0,0,.06)",
                    overflow: "hidden",
                }}
            >

                <div
                    style={{
                        padding: "10px 12px",
                        borderBottom: `2px solid ${CARD}`,
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#0f172a",
                        display: "flex",
                        gap: 12,
                        // justifyContent: "space-between",
                        // alignItems: "center",
                    }}
                >
                    <span>[{(label || "FREEFORM").toString()}]</span>
                    { label !== content && <span>{content || "FREEFORM"}</span> }
                </div>


                <div
                    style={{
                        padding: 12,
                        background: `${CARD}22`,       // 연한 초록 배경
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        gap: 8,
                    }}
                >
                    {nodeData?.freeBlockInfo?.question?.imagePath ?
                        (<img alt={"image"} src={nodeData?.freeBlockInfo?.question?.imagePath} /> )
                        : (
                            <span style={{
                                position: "absolute",
                                top: -34,
                                right: 8
                            }}>
                                <ImagePlus/>
                            </span>
                        )
                    }
                    <div
                        style={{
                            background: PLATE,           // 파란 판
                            color: "#fff",
                            borderRadius: 18,
                            height: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            // flex: 1,
                        }}
                    >
                        {nodeData?.freeBlockInfo?.question?.text ?? "질문을 입력하세요."}
                    </div>

                </div>

                {/* 푸터 버튼 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 10px",
                        background: "#fff",
                    }}
                >
                    <button style={chip} onClick={add}>추가</button>
                    <button
                        style={{ ...chip, borderColor: "#fecaca", color: "#b91c1c" }}
                        onClick={del}
                    >
                        삭제
                    </button>
                </div>
            </div>

            {/* 연결 핸들 (안 잘리게 래퍼 밖) */}
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
