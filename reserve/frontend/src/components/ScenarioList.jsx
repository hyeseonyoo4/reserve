import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axios.js";

const mockScenarios = [
    { id: "s-1", name: "상담 플로우 A" },
    { id: "s-2", name: "예약 플로우 B" },
]
//



export default function ScenarioList() {
    const nav = useNavigate()
    const [scenarios, setScenarios] = React.useState([])

    useEffect(() => {
        axiosInstance.get("/api/v1/scenario").then(
            (res) => {
                console.log(res.data)
                if(res.data.code === "0000") {
                    setScenarios(res.data.data.elements ?? []);
                } else {
                    alert("시나리오 목록을 불러오는데 실패했습니다.")
                }
            }
        )
    }, [])

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
                <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                    <span style={ { fontWeight: 600, fontSize: 14}}>
                        {s.name}
                    </span>
                    <span style={ { color: "#64748b", fontSize: 12}}>
                        {s.isDraft ? "(Draft)" : `(v${s.version})`}
                    </span>
                </div>
            </button>
        )
    }
//                 "id": "68b430be7b76a2e03ff3390f",
//                 "name": "시나리오 테스트3",
//                 "key": "SCENARIO_TEST3",
//                 "isDraft": true,
//                 "version": 0,
//                 "versionDescription": "Draft 버전 입니다.",
//                 "createdAt": "2025-08-31T20:23:42.134",
//                 "blockCount": 0
    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ marginBottom: 12 }}>시나리오 선택</h2>
            <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
                {scenarios.map((s) => converterButton(s))}
            </div>
        </div>
    )
}
