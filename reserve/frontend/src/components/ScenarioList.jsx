import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";

const mockScenarios = [
    { id: "s-1", name: "상담 플로우 A", isDraft: true,  version: 0 },
    { id: "s-2", name: "예약 플로우 B", isDraft: false, version: 1 },
];

export default function ScenarioList() {
    const nav = useNavigate();
    const [scenarios, setScenarios] = React.useState(mockScenarios); // 초기값: 목 데이터
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await axiosInstance.get("/api/v1/scenario");
                // 기대 응답 구조: { code: "0000", data: { elements: [...] } }
                const ok = res?.data?.code === "0000";
                const elements = res?.data?.data?.elements ?? [];

                if (mounted) {
                    if (ok && elements.length > 0) {
                        setScenarios(elements);
                    } else {
                        // 실패/빈값 → 목 데이터 유지
                        setScenarios(mockScenarios);
                        if (!ok) {
                            console.warn("시나리오 목록 불러오기에 실패했습니다. 목 데이터를 사용합니다.", res?.data);
                        }
                    }
                }
            } catch (err) {
                if (mounted) {
                    console.warn("API 호출 에러. 목 데이터를 사용합니다.", err);
                    setScenarios(mockScenarios);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
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
            <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                <span style={{ color: "#64748b", fontSize: 12 }}>
          {s.isDraft ? "(Draft)" : `(v${s.version ?? 0})`}
        </span>
            </div>
        </button>
    );

    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ marginBottom: 12 }}>시나리오 선택</h2>

            {loading ? (
                <div style={{ color: "#64748b", fontSize: 14 }}>불러오는 중…</div>
            ) : (
                <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
                    {scenarios.map((s) => converterButton(s))}
                </div>
            )}
        </div>
    );
}
