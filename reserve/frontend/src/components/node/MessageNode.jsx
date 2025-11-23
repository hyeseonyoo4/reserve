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
import NodeHeaderTitle from "../common/NodeHeaderTitle.jsx";
import ToggleButton from "../edit/ToggleButton.jsx";
import { MessageBlockInfo } from "../type/BlockType.js";

export function MessageNode({ id, data = {}, selected }) {
    const { label, type, data: nodeData, onAdd, onDelete, buttons = null } = data;

    // stores
    const setNodeData = useScenarioDataStore((s) => s.setNodeData);
    const { currentNode, target, setCurrentNode, setTarget } =
        useScenarioEditStore((s) => s);

    // styles
    const CARD = typeColors[String(type || "").toUpperCase()] || "#8b5cf6";
    const PLATE = "#3b82f6";
    const CARD_BG = "#fff";
    const LIGHT_SECTION = `${CARD}22`;

    // utilities
    const ensureMBI = () => {
        if (!nodeData.messageBlockInfo) nodeData.messageBlockInfo = new MessageBlockInfo();
        if (!Array.isArray(nodeData.messageBlockInfo.messages)) nodeData.messageBlockInfo.messages = [{ text: "" }];
    };

    // ---- slides (messages as slides) ----
    ensureMBI();
    const slides = nodeData.messageBlockInfo.messages;
    const activeIndex =
        nodeData.messageBlockInfo.activeIndex != null
            ? nodeData.messageBlockInfo.activeIndex
            : 0;

    const setActive = (idx) => {
        ensureMBI();
        nodeData.messageBlockInfo.activeIndex = idx;
        setNodeData(nodeData.id, nodeData);
    };

    const addSlide = () => {
        ensureMBI();
        nodeData.messageBlockInfo.messages.push({ text: "" });
        nodeData.messageBlockInfo.activeIndex = nodeData.messageBlockInfo.messages.length - 1;
        setNodeData(nodeData.id, nodeData);
    };

    const removeActiveSlide = () => {
        ensureMBI();
        const arr = nodeData.messageBlockInfo.messages;
        if (arr.length <= 1) return; // 최소 1개 유지
        arr.splice(activeIndex, 1);
        nodeData.messageBlockInfo.activeIndex = Math.max(0, activeIndex - 1);
        setNodeData(nodeData.id, nodeData);
    };

    // handlers
    const add = (e) => { e.stopPropagation(); onAdd?.(id); };
    const del = (e) => { e.stopPropagation(); onDelete?.(id); };
    const onStartEdit = (editType) => { setTarget(editType); setCurrentNode(id); };

    const onEditChange = (editType, value) => {
        if (!nodeData) return;
        switch (editType) {
            case TargetComponentType.TEXT: {
                ensureMBI();
                const idx = nodeData.messageBlockInfo.activeIndex ?? 0;
                nodeData.messageBlockInfo.messages[idx] ??= { text: "" };
                nodeData.messageBlockInfo.messages[idx].text = value;
                break;
            }
            case TargetComponentType.TITLE: {
                nodeData.name = value ?? "";
                break;
            }
            case TargetComponentType.SLIDE_TOGGLE: {
                ensureMBI();
                nodeData.messageBlockInfo.style = value ? "SLIDE" : "TEXT";
                break;
            }
            default:
                return;
        }
        setNodeData(nodeData.id, nodeData);
    };

    const onEditEnd = () => { setTarget(null); setCurrentNode(null); };

    // 버튼 로직 (활성 슬라이드에서만 보여줌)
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

    // 마지막 숫자 버튼 삭제
    const onRemoveChoice = (e) => {
        e.stopPropagation();
        const newButtons = [...btns];
        for (let i = newButtons.length - 1; i >= 0; i--) {
            if (numberRe.test(newButtons[i])) {
                newButtons.splice(i, 1);
                break;
            }
        }
        setNodeData(id, { ...data, buttons: newButtons });
    };

    const lastIsNumeric = numberRe.test(btns[btns.length - 1] || "");
    const hasAnyNumeric = btns.some((b) => numberRe.test(b));

    const isEditingText = currentNode === id && target === TargetComponentType.TEXT;
    const messageText = slides[activeIndex]?.text ?? "";

    return (
        <div style={{ position: "relative", overflow: "visible" }}>
            <div
                style={{
                    width: 280,
                    border: `2px solid ${CARD}`,
                    borderRadius: 16,
                    background: CARD_BG,
                    boxShadow: selected
                        ? `0 0 0 4px ${LIGHT_SECTION}, 0 8px 24px rgba(0,0,0,.08)`
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
                    <NodeHeaderTitle
                        nodeData={nodeData}
                        label={label}
                        blockType={"MESSAGE"}
                        onEditChange={onEditChange}
                        onStartEdit={onStartEdit}
                        onEditEnd={onEditEnd}
                    />
                    <ToggleButton
                        isOn={nodeData?.messageBlockInfo?.style === "SLIDE" ?? false}
                        onToggle={(value) =>
                            onEditChange(TargetComponentType.SLIDE_TOGGLE, value)
                        }
                    />
                </div>

                {/* 바디: 슬라이드 리스트 */}
                <div style={{ padding: 12, background: LIGHT_SECTION }}>
                    {/* 슬라이드 추가/삭제 컨트롤 */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ fontWeight: 900 }}>슬라이드</div>
                        <div style={{ display: "flex", gap: 6 }}>
                            <button style={foldBtn} onClick={addSlide}>슬라이드 +</button>
                            <button style={foldBtn} onClick={removeActiveSlide}>슬라이드 −</button>
                        </div>
                    </div>

                    {slides.map((slide, idx) => {
                        const isActive = idx === activeIndex;

                        // 축약 카드 (비활성)
                        if (!isActive) {
                            return (
                                <div
                                    key={`slide-${idx}`}
                                    onClick={() => setActive(idx)}
                                    style={collapsedCard}
                                    title={`슬라이드 ${idx + 1} 열기`}
                                >
                                    <div style={{ fontWeight: 800 }}>슬라이드 {idx + 1}</div>
                                    <div style={collapsedMeta}>
                                        {(slide.text || "").slice(0, 18) || "내용 없음"}
                                        {(slide.text || "").length > 18 ? "…" : ""}
                                    </div>
                                    <div style={{ display: "flex", gap: 6 }}>
                                        <span style={miniBox} />
                                        <span style={miniBox} />
                                        <span style={miniBox} />
                                    </div>
                                </div>
                            );
                        }

                        // 펼친 카드 (활성)
                        return (
                            <div key={`slide-${idx}`} style={expandedCard}>
                                {/* 슬라이드 헤더바 */}
                                <div style={slideHeader}>
                                    <div style={{ fontWeight: 800 }}>슬라이드 {idx + 1}</div>
                                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                                        <span style={miniBox} />
                                        <span style={miniBox} />
                                        <span style={miniBox} />
                                        <button style={foldBtn} onClick={() => setActive(-1)}>접기</button>
                                    </div>
                                </div>

                                {/* 메시지 */}
                                <div style={{ padding: 12 }}>
                                    {isEditingText ? (
                                        <TextArea
                                            value={messageText}
                                            placeholder="메시지를 입력하세요."
                                            onChange={(newText) =>
                                                onEditChange(TargetComponentType.TEXT, newText)
                                            }
                                            onBlur={onEditEnd}
                                            autoFocus
                                            rows={6}
                                            style={{
                                                border: "2px solid #3b82f6",
                                                borderRadius: 12,
                                                padding: "10px 12px",
                                                fontWeight: 600,
                                                maxHeight: 180,
                                                overflowY: "auto",
                                            }}
                                        />
                                    ) : (
                                        <div
                                            onClick={() => onStartEdit(TargetComponentType.TEXT)}
                                            style={messagePlate}
                                            title="클릭하여 편집"
                                        >
                                            {messageText || "메시지"}
                                        </div>
                                    )}

                                    {/* 버튼: 활성 슬라이드에서만 */}
                                    <div style={{ marginTop: 10 }}>
                                        {btns.map((btn, i) => {
                                            const isLast = i === btns.length - 1;
                                            const showControls = isLast && numberRe.test(btns[btns.length - 1] || "");
                                            if (showControls) {
                                                return (
                                                    <div
                                                        key={`btn-${i}`}
                                                        style={{ position: "relative", marginTop: i ? 8 : 0 }}
                                                    >
                                                        <div style={{ ...thinBar, paddingRight: 96 }}>{btn}</div>
                                                        <div
                                                            style={{
                                                                position: "absolute",
                                                                top: "50%",
                                                                right: 8,
                                                                transform: "translateY(-50%)",
                                                                display: "flex",
                                                                gap: 8,
                                                            }}
                                                        >
                                                            {hasAnyNumeric && (
                                                                <button onClick={onRemoveChoice} title="버튼 삭제" style={minusChip}>
                                                                    −
                                                                </button>
                                                            )}
                                                            <button onClick={onAddChoice} title="버튼 추가" style={plusChip}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={`btn-${i}`} style={{ ...thinBar, marginTop: i ? 8 : 0 }}>
                                                    {btn}
                                                </div>
                                            );
                                        })}

                                        {!lastIsNumeric && (
                                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8, gap: 8 }}>
                                                {hasAnyNumeric && (
                                                    <button onClick={onRemoveChoice} title="버튼 삭제" style={minusChip}>
                                                        −
                                                    </button>
                                                )}
                                                <button onClick={onAddChoice} title="버튼 추가" style={plusChip}>
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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
const messagePlate = {
    background: "#3b82f6",
    color: "#fff",
    borderRadius: 18,
    minHeight: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    padding: "12px 14px",
    lineHeight: 1.35,
    cursor: "text",
    userSelect: "none",
    maxHeight: 180,
    overflowY: "auto",
    whiteSpace: "pre-wrap",
};

const collapsedCard = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "8px 10px",
    border: "1px solid #c7d2fe",
    background: "#e5e7fb",
    borderRadius: 8,
    marginBottom: 8,
    cursor: "pointer",
};

const collapsedMeta = {
    flex: 1,
    fontSize: 12,
    color: "#334155",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
};

const expandedCard = {
    border: "1px solid #c7d2fe",
    background: "#e8efff",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
};

const slideHeader = {
    height: 34,
    background: "#bfd7ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
    borderBottom: "1px solid #c7d2fe",
};

const miniBox = {
    width: 12,
    height: 12,
    background: "#94a3b8",
    borderRadius: 2,
};

const foldBtn = {
    border: "1px solid #94a3b8",
    background: "#fff",
    borderRadius: 6,
    fontSize: 11,
    padding: "2px 6px",
    cursor: "pointer",
};

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

const minusChip = {
    ...plusChip,
    borderColor: "#fecaca",
    color: "#b91c1c",
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
