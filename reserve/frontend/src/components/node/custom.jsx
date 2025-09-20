import React from "react";
import { Handle, Position } from "@xyflow/react";

// 블록 타입별 색상(테두리/배지/하이라이트에 사용)
const typeColors = {
    START:  "#ef4444", // 빨강
    SELECT: "#f97316", // 주황
    FORM:   "#facc15", // 노랑
    FREE:   "#22c55e", // 초록
    API:    "#3b82f6", // 파랑
    SPLIT:  "#6366f1", // 남보라
    MESSAGE:"#8b5cf6", // 보라
    END:    "#ec4899", // 분홍
};

export function CustomNode({ id, data, selected }) {
    const { label, type, content, onAdd, onDelete } = data;
    const upperType = String(type || "").toUpperCase();
    const color = typeColors[upperType] || "#6b7280"; // 기본 회색

    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

    return (
        // 핸들 잘림 방지
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${color}`,     // 타입별 테두리
                    borderRadius: 16,
                    background: "#fff",
                    boxShadow: selected
                        ? `0 0 0 4px ${color}22, 0 8px 24px rgba(0,0,0,.08)`
                        : "0 8px 24px rgba(0,0,0,.06)",
                    overflow: "hidden",
                }}
            >
                {/* 헤더 */}
                <div
                    style={{
                        padding: "10px 12px",
                        borderBottom: `2px solid ${color}`,
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#0f172a",
                    }}
                >
                    {String(label || "").toUpperCase()}
                </div>

                {/* 바디 */}
                <div
                    style={{
                        padding: "14px",
                        background: color + "22", // 타입색 연한 배경
                        borderBottom: "1px solid #eaf0ff",
                        textAlign: "center",
                    }}
                >
          <span
              style={{
                  display: "inline-block",
                  fontSize: 12,
                  padding: "2px 10px",
                  borderRadius: 9999,
                  background: color,
                  color: "#fff",
                  marginBottom: 8,
              }}
          >
            {String(type || "")}
          </span>
                    <div style={{ fontSize: 16, color: "#374151", fontWeight: 600 }}>
                        {String(label || "").toUpperCase()}
                    </div>
                    {content && (
                        <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
                            {content}
                        </div>
                    )}
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

            {/* 연결 핸들 (겹침 방지용 zIndex) */}
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
