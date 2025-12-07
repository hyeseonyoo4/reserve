import React, { useState } from "react";
import { ArrowUp, ArrowDown, Trash2, Edit2, Plus } from "lucide-react";
import {Button} from "../type/BlockType.js"; // 아이콘 사용

// 드롭다운용 버튼 타입 옵션
const buttonTypes = [
    { label: "URL", value: "URL" },
    { label: "파일 다운로드", value: "FILE_DOWNLOAD" },
    { label: "전화 연결", value: "TEL" },
    { label: "이메일 보내기", value: "EMAIL" },
];

// Select 컴포넌트
const Select = ({ options, value, onChange }) => {
    return (
        <select
            style={{
                padding: "2px",
                fontSize: "12px",
                width: "90px",
                borderRadius: "4px",
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

// ButtonManager 컴포넌트
const ButtonManager = ({buttons, onChange}) => {
    // const [buttons, setButtons] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // 펼쳐진 버튼 인덱스 관리

    const addButton = () => {
        onChange([
            ...buttons,
            new Button({ id: `btn-${Date.now()}`, text: `버튼${buttons.length + 1}`, action: "url", actionValue: "" }),
        ]);
    };

    const removeButton = (index) => {
        const updatedButtons = [...buttons];
        updatedButtons.splice(index, 1);
        onChange(updatedButtons);
        if (expandedIndex === index) setExpandedIndex(null);
    };

    const updateButton = (index, field, value) => {
        const updatedButtons = [...buttons];
        updatedButtons[index][field] = value;
        onChange(updatedButtons);
    };

    const moveButton = (index, direction) => {
        const updatedButtons = [...buttons];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= updatedButtons.length) return;

        const [movedButton] = updatedButtons.splice(index, 1);
        updatedButtons.splice(targetIndex, 0, movedButton);

        onChange(updatedButtons);
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div
            style={{
                width: "calc(100%-24px)",
                boxSizing: "content-box",
                fontSize: "12px",
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            {/* 버튼 리스트 */}
            {buttons.map((btn, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: "6px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* 접힌 상태 */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <strong
                            onClick={() => toggleExpand(index)}
                            style={{
                                cursor: "pointer",
                                fontWeight: "bold",
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {btn.text}
                        </strong>
                        <button
                            onClick={() => moveButton(index, "up")}
                            disabled={index === 0}
                            title="올리기"
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: "2px",
                            }}
                        >
                            <ArrowUp size={14} />
                        </button>
                        <button
                            onClick={() => moveButton(index, "down")}
                            disabled={index === buttons.length - 1}
                            title="내리기"
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: "2px",
                            }}
                        >
                            <ArrowDown size={14} />
                        </button>
                        <button
                            onClick={() => removeButton(index)}
                            title="삭제"
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                padding: "2px",
                            }}
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    {/* 펼쳐진 상태 */}
                    {expandedIndex === index && (
                        <div
                            style={{
                                marginTop: "4px",
                                padding: "4px",
                                background: "#fff",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                            }}
                        >
                            <div style={{ marginBottom: "4px" }}>
                                <label style={{ display: "block", marginBottom: "2px" }}>
                                    버튼명:
                                </label>
                                <input
                                    type="text"
                                    value={btn.text}
                                    onChange={(e) => updateButton(index, "text", e.target.value)}
                                    style={{
                                        fontSize: "12px",
                                        padding: "2px",
                                        width: "100%",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: "4px" }}>
                                <label style={{ display: "block", marginBottom: "2px" }}>
                                    버튼타입:
                                </label>
                                <Select
                                    options={buttonTypes}
                                    value={btn.action}
                                    onChange={(value) => updateButton(index, "action", value)}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", marginBottom: "2px" }}>
                                    버튼값:
                                </label>
                                <input
                                    type="text"
                                    value={btn.actionValue}
                                    onChange={(e) => updateButton(index, "actionValue", e.target.value)}
                                    style={{
                                        fontSize: "12px",
                                        padding: "2px",
                                        width: "100%",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* 버튼 추가 */}
            <button
                onClick={addButton}
                style={{
                    marginTop: "8px",
                    padding: "4px",
                    fontSize: "12px",
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    backgroundColor: "#f0f0f0",
                    cursor: "pointer",
                }}
            >
                <Plus size={14} />
                버튼 추가
            </button>
        </div>
    );
};

export default ButtonManager;