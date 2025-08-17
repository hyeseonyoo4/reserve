import React from "react"
import { Handle, Position } from "@xyflow/react"

// 이름 있는 export
export function CustomNode({ data }) {
    return (
        <div
            style={{
                padding: 12,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#fff",
                minWidth: 180,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                {data.type?.toUpperCase?.()}
            </div>
            <div style={{ fontWeight: 800 }}>{data.label}</div>
            <div style={{ fontSize: 12, color: "#374151", marginTop: 6 }}>{data.content}</div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    )
}
