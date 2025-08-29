import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStudioStore } from "../store";
import FlowCanvas from "./FlowCanvas.jsx";
import RightDrawer from "../components/RightDrawer";

const BLOCK_TYPES = ["START","SELECT","FORM","FREE","API","SPLIT","MESSAGE","END"];
const KOR = { START:"시작", SELECT:"선택", FORM:"폼입력", FREE:"자유", API:"API", SPLIT:"분기", MESSAGE:"메시지", END:"끝" };

export default function EditorPage() {
    const { scenarioId } = useParams();
    const setScenarioId = useStudioStore(s => s.setScenarioId);
    const open = useStudioStore(s => s.drawerOpen);


    const addBlock =
        useStudioStore(s => s.addBlock) ||
        useStudioStore(s => s.addBlockOfType) ||
        useStudioStore(s => s.createBlock);

    const title = useMemo(() => (scenarioId ? `시나리오: 편집 ${scenarioId}` : "시나리오 편집"), [scenarioId]);

    useEffect(() => {
        setScenarioId?.(scenarioId);
    }, [scenarioId, setScenarioId]);

    const handleAdd = (type) => {
        if (addBlock) {
            addBlock(type);
        } else {
            // 스토어 액션이 없다면 FlowCanvas가 이 이벤트를 받아 내부 addBlock을 실행하도록 해도 됨
            window.dispatchEvent(new CustomEvent("studio:addBlock", { detail: { type } }));
        }
    };

    return (
        <div style={{ display:"grid", gridTemplateColumns: open ? "1fr 360px" : "1fr", height:"calc(100vh - 56px)" }}>
            <div style={{ minWidth:0, display:"flex", flexDirection:"column" }}>
                {/* 상단 타이틀 바 */}
                <div style={{ padding:"8px 12px", borderBottom:"1px solid #eee", background:"#fff" }}>
                    {title}
                </div>

                {/* 캔버스 래퍼: relative로 두고 툴바를 absolute로 올림 */}
                <div style={{ position:"relative", flex:1, minHeight:0 }}>
                    {/* 🔹 떠있는 필 버튼 툴바 (캔버스 좌상단) */}
                    <div
                        style={{
                            position:"absolute", top:12, left:12, zIndex:10,
                            display:"flex", gap:8, flexWrap:"wrap",
                            background:"rgba(255,255,255,.9)", padding:"8px 10px",
                            border:"1px solid #e5e7eb", borderRadius:12,
                            boxShadow:"0 8px 20px rgba(0,0,0,.08)"
                        }}
                    >
                        {BLOCK_TYPES.map(t => (
                            <button
                                key={t}
                                onClick={() => handleAdd(t)}
                                style={{
                                    padding:"6px 12px",
                                    border:"1px solid #e5e7eb",
                                    borderRadius:9999,
                                    background:"#fff",
                                    fontSize:14,
                                    cursor:"pointer",
                                    boxShadow:"0 1px 2px rgba(0,0,0,.06)"
                                }}
                            >
                                + {KOR[t] || t}
                            </button>
                        ))}
                    </div>

                    {/* 실제 캔버스 */}
                    <FlowCanvas />
                </div>
            </div>

            {open && <RightDrawer width={360} />}
        </div>
    );
}
