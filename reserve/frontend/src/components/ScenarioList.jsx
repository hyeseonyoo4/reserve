import React from "react"
import { useNavigate } from "react-router-dom"

const mockScenarios = [
    { id: "s-1", name: "상담 플로우 A" },
    { id: "s-2", name: "예약 플로우 B" },
]

export default function ScenarioList() {
    const nav = useNavigate()

    const converterButton = (s) => {
        return (
            <button
                key={s.id}
                onClick={() => nav(`/editor/${s.id}`)}
                style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    textAlign: "left",
                    cursor: "pointer"
                }}
            >
                {s.name}
            </button>
        )
    }

    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ marginBottom: 12 }}>시나리오 선택</h2>
            <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
                {mockScenarios.map((s) => converterButton(s))}
            </div>
        </div>
    )
}
