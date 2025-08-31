import React from "react"

const Item = ({ type, label }) => {
    const onDragStart = (e) => {
        e.dataTransfer.setData("application/reactflow", type)
        e.dataTransfer.effectAllowed = "move"
    }

    return (
        <div
            draggable
            onDragStart={onDragStart}
            style={{
                padding: "10px 12px",
                border: "1px dashed #d1d5db",
                borderRadius: 10,
                background: "#fff",
                cursor: "grab",
            }}
        >
            {label}
        </div>
    )
}

export default function Sidebar() {
    return (
        <aside style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, borderRight: "1px solid #e5e7eb", background: "#f3f4f6", width: "160px" }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>블록 추가</div>
            <Item type="dialog" label="대화"  />
            <Item type="branch" label="분기" />
            <Item type="timer" label="타이머" />
            <Item type="complete" label="완료" />
        </aside>
    )
}
