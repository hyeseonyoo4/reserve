import React, { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useStudioStore } from "../store"
import FlowCanvas from "./FlowCanvas.jsx"
import RightDrawer from "../components/RightDrawer"

export default function EditorPage() {
    const { scenarioId } = useParams()
    const setScenarioId = useStudioStore((s) => s.setScenarioId)
    const open = useStudioStore((s) => s.drawerOpen)

    // 실제라면 시나리오 로드 API → 여기선 타이틀 표시만
    const title = useMemo(() => (scenarioId ? `시나리오 편집: ${scenarioId}` : "시나리오 편집"), [scenarioId])

    // 첫 마운트 시 전역에 세팅
    useState(() => { setScenarioId(scenarioId) })

    return (
        <div style={{ display: "grid", gridTemplateColumns: open ? "1fr 360px" : "1fr", height: "calc(100vh - 56px)" }}>
            {/* 좌측 캔버스 */}
            <div style={{ minWidth: 0 }}>
                <div style={{ padding: "8px 12px", borderBottom: "1px solid #eee", background: "#fff" }}>{title}</div>
                <FlowCanvas />
            </div>

            {/* 우측 Drawer */}
            {open && <RightDrawer width={360} />}
        </div>
    )
}
