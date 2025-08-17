import React, { useState, useEffect } from "react"
import { useStudioStore } from "../store"

export default function RightDrawer({ width = 360 }) {
    const close = useStudioStore((s) => s.closeDrawer)
    const selectedNode = useStudioStore((s) => s.selectedNode)
    const updateNodeData = useStudioStore((s) => s.updateNodeData)


    const [form, setForm] = useState({ label: "", content: "" })

    useEffect(() => {
        if (selectedNode?.data) {
            setForm({ label: selectedNode.data.label || "", content: selectedNode.data.content || "" })
        }
    }, [selectedNode])

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    const onSave = () => {
        updateNodeData({ label: form.label, content: form.content })
        close()
    }

    if (!selectedNode) return null

    return (
        <aside style={{
            width, background: "#fff", borderLeft: "1px solid #eee",
            padding: 16, display: "grid", gridTemplateRows: "auto 1fr auto"
        }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>블록 상세</div>

            <div style={{ display: "grid", gap: 12 }}>
                <div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>ID</div>
                    <div>{selectedNode.id}</div>
                </div>

                <div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>타입</div>
                    <div>{selectedNode.data?.type}</div>
                </div>

                <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>라벨</span>
                    <input
                        name="label"
                        value={form.label}
                        onChange={onChange}
                        style={{ padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 8 }}
                    />
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>내용</span>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={onChange}
                        rows={6}
                        style={{ padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 8, resize: "vertical" }}
                    />
                </label>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
                <button onClick={close} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer" }}>
                    닫기
                </button>
                <button onClick={onSave} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #2563eb", background: "#2563eb", color: "#fff", cursor: "pointer" }}>
                    저장
                </button>
            </div>
        </aside>
    )
}
