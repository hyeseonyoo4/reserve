import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios.js";
import {convertBlockToNodeEdge} from "../utils/BlockConvertUtils.jsx";
import {LayerPopup} from "./LayerPopup.jsx";
import {useLayerPopup} from "../hooks/use-layer-popup.js";
import NewScenario from "./scenario/NewScenario.jsx";

const mockScenarios = [
    {id: "s-1", name: "상담 플로우 A", isDraft: true, version: 0},
    {id: "s-2", name: "예약 플로우 B", isDraft: false, version: 1},
];

export default function ScenarioList() {
    const basicPopup = useLayerPopup();
    const [message, setMessage] = useState("")
    const nav = useNavigate();
    const [scenarios, setScenarios] = React.useState(mockScenarios); // 초기값: 목 데이터
    const [loading, setLoading] = React.useState(true);

    const [newScenarioInfo, setNewScenarioInfo] = useState({
        name: "",
        key:"",
        isDraft: true,
        version: 0,
        versionDescription: "",
    });

    const handleCustomAction = (action) => {
        setMessage(`${action} 버튼이 클릭되었습니다!`)
        setTimeout(() => setMessage(""), 3000)
    }

    const createNewScenario = async () => {
        const res = await axiosInstance.post('/api/v1/scenario', newScenarioInfo);
        console.log("createNewScenario response:", res?.data);
        if (res?.data?.code === "0000") {
            await fetchScenarios();
        }
    }

    const fetchScenarios = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/scenario");
            // 기대 응답 구조: { code: "0000", data: { elements: [...] } }

            console.log("fetchScenarios response:", res?.data);
            const ok = res?.data?.code === "0000";
            const elements = res?.data?.data?.elements ?? [];

            if (ok && elements.length > 0) {
                setScenarios(elements);
            } else {
                // 실패/빈값 → 목 데이터 유지
                setScenarios(mockScenarios);
                if (!ok) {
                    console.warn("시나리오 목록 불러오기에 실패했습니다. 목 데이터를 사용합니다.", res?.data);
                }
            }
        } catch (err) {
            console.warn("API 호출 에러. 목 데이터를 사용합니다.", err);
            setScenarios(mockScenarios);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => { await fetchScenarios()})();
    }, []);

    const converterButton = (s) => (
        <button
            key={s.id}
            onClick={() => nav(`/editor/${s.id}`)}
            style={{
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#fff",
                textAlign: "left",
                cursor: "pointer",
            }}
        >
            <div style={{display: "flex", alignItems: "stretch", gap: 8}}>
                <span style={{fontWeight: 600, fontSize: 14}}>{s.name}</span>
                <span style={{color: "#64748b", fontSize: 12}}>
          {s.isDraft ? "(Draft)" : `(v${s.version ?? 0})`}
        </span>
            </div>
        </button>
    );

    const newScenario = () => (
        <button
            key={"new-scenario"}
            onClick={() => basicPopup.openPopup()}
            style={{
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#f1f5f9",
                textAlign: "left",
                cursor: "pointer",
            }}
        >
            <div style={{display: "flex", alignItems: "stretch", gap: 8}}>
                <span style={{fontWeight: 600, fontSize: 14}}>+ 시나리오 생성</span>
            </div>
        </button>
    )

    return (
        <>
            <div style={{padding: 16}}>
                <h2 style={{marginBottom: 12}}>시나리오 선택</h2>

                {loading ? (
                    <div style={{color: "#64748b", fontSize: 14}}>불러오는 중…</div>
                ) : scenarios.length === 0 ? (
                    <div style={{color: "#64748b", fontSize: 14}}>시나리오가 없습니다. 새로 만드세요!</div>
                ) : (
                    <div style={{display: "grid", gap: 8}}>
                        {scenarios.map((s) => converterButton(s))}
                        {newScenario()}
                    </div>
                )}
            </div>
            <LayerPopup
                isOpen={basicPopup.isOpen}
                onClose={basicPopup.closePopup}
                title="시나리오 생성"
                onOk={(async () => { await createNewScenario()})}
                onCancel={() => handleCustomAction("Cancel")}
            >
                <NewScenario
                    setNewScenarioInfo={setNewScenarioInfo}
                />
            </LayerPopup>
        </>
    );
}
