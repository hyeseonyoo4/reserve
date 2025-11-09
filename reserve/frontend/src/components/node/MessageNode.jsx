// src/components/node/MessageNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { typeColors } from "../../utils/types.js";
import TextArea from "../edit/TextArea.jsx";
import {
    TargetComponentType,
    useScenarioEditStore,
} from "../../store/useScenarioEditStore.js";
import { useScenarioDataStore } from "../../store/useScenarioDataStore.js";

export function MessageNode({ id, data = {}, selected }) {
    const { label, type, content, onAdd, onDelete, buttons = null } = data;

    // stores
    const setNodeData = useScenarioDataStore((s) => s.setNodeData);
    const { currentNode, target, setCurrentNode, setTarget } =
        useScenarioEditStore((s) => s);

    // styles
    const BORDER = typeColors[String(type || "").toUpperCase()] || "#8b5cf6";
    const CARD_BG = "#fff";
    const PLATE = "#3b82f6";
    const LIGHT_SECTION = `${BORDER}22`;

    // handlers
    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };

    const onStartEdit = (editType) => { setTarget(editType); setCurrentNode(id); };
    const onEditChange = (newText) => { setNodeData(id, { ...data, content: newText ?? "" }); };
    const onEditEnd = () => { setTarget(null); setCurrentNode(null); };

    // 버튼 로직
    const btns = Array.isArray(buttons) ? buttons : ["버튼 정보", "버튼 1"];
    const numberRe = /^버튼\s*(\d+)$/;
    const nextButtonLabel = () => {
        const max = btns.reduce((m, b) => {
            const r = b.match(numberRe);
            return r ? Math.max(m, parseInt(r[1], 10)) : m;
        }, 0);
        return `버튼 ${max + 1}`;
    };
    const onAddChoice = (e) => {
        e.stopPropagation();
        setNodeData(id, { ...data, buttons: [...btns, nextButtonLabel()] });
    };
    const lastIsNumeric = numberRe.test(btns[btns.length - 1] || "");
    const isEditingText = currentNode === id && target === TargetComponentType.TEXT;

    return (
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${BORDER}`,
                    borderRadius: 16,
                    background: CARD_BG,
                    boxShadow: selected
                        ? `0 0 0 4px ${BORDER}22, 0 8px 24px rgba(0,0,0,.08)`
                        : "0 8px 24px rgba(0,0,0,.06)",
                    overflow: "hidden",
                }}
            >
                {/* 헤더 */}
                <div
                    style={{
                        padding: "10px 12px",
                        borderBottom: `2px solid ${BORDER}`,
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#0f172a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {(label || "MESSAGE").toString()}
                </div>

                {/* 바디 */}
                <div style={{ padding: 12, background: LIGHT_SECTION, textAlign: "center" }}>
                    {/* 메시지 본문 */}
                    {isEditingText ? (
                        <div style={{ marginBottom: 12 }}>
                            <TextArea
                                value={content ?? ""}
                                placeholder="메시지를 입력하세요."
                                onChange={onEditChange}
                                onBlur={onEditEnd}
                                autoFocus
                                rows={4}
                                style={{
                                    width: "100%",
                                    border: `2px solid ${PLATE}`,
                                    borderRadius: 12,
                                    padding: "10px 12px",
                                    fontWeight: 600,
                                    lineHeight: 1.4,
                                }}
                            />
                        </div>
                    ) : (
                        <div
                            onClick={() => onStartEdit(TargetComponentType.TEXT)}
                            style={{
                                background: PLATE,
                                color: "#fff",
                                borderRadius: 18,
                                minHeight: 60,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                padding: "12px 14px",
                                marginBottom: 12,
                                lineHeight: 1.35,
                                cursor: "text",
                                userSelect: "none",
                            }}
                            title="클릭하여 편집"
                        >
                            {(content ?? "메시지").toString()}
                        </div>
                    )}

                    {/* 버튼 그룹: 마지막 숫자 버튼엔 오버레이 + */}
                    {btns.map((btn, idx) => {
                        const isLast = idx === btns.length - 1;
                        const showPlus = isLast && lastIsNumeric;

                        if (showPlus) {
                            return (
                                <div
                                    key={`${id}-btn-${idx}`}
                                    style={{
                                        position: "relative",          // 오버레이 기준
                                        marginTop: idx === 0 ? 0 : 8,
                                    }}
                                >
                                    {/* 파란 버튼 전체폭 */}
                                    <div style={{ ...thinBar, paddingRight: 48 }}>{btn}</div>

                                    {/* 오른쪽 흰색 + 칩 (오버레이) */}
                                    <button
                                        onClick={onAddChoice}
                                        title="버튼 추가"
                                        style={{
                                            ...plusChip,
                                            position: "absolute",
                                            top: "50%",
                                            right: 8,
                                            transform: "translateY(-50%)",
                                            zIndex: 2,
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={`${id}-btn-${idx}`}
                                style={{ ...thinBar, marginTop: idx === 0 ? 0 : 8 }}
                            >
                                {btn}
                            </div>
                        );
                    })}

                    {/* 마지막이 숫자 버튼이 아니면 우측 하단에 +만 노출 */}
                    {!lastIsNumeric && (
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                            <button onClick={onAddChoice} title="버튼 추가" style={plusChip}>+</button>
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
                    <button
                        style={{ ...chip, borderColor: "#fecaca", color: "#b91c1c" }}
                        onClick={del}
                    >
                        삭제
                    </button>
                </div>
            </div>

            <Handle type="target" position={Position.Top} style={handleStyle} />
            <Handle type="source" position={Position.Bottom} style={handleStyle} />
        </div>
    );
}

/* --- styles --- */
const thinBar = {
    background: "#3b82f6",
    color: "#fff",
    borderRadius: 18,
    padding: "12px 14px",
    textAlign: "center",
    fontWeight: 700,
};

const plusChip = {
    minWidth: 36,
    height: 36,
    padding: "0 10px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    cursor: "pointer",
    fontWeight: 800,
    boxShadow: "0 2px 6px rgba(0,0,0,.06)",
};

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
