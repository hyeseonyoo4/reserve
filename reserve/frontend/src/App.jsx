// src/App.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";
import RightDrawer from "./components/RightDrawer";
import { useStudioStore } from "./store";

export default function App() {
    const selectedNode = useStudioStore((s) => s.selectedNode);

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateRows: "56px 1fr" }}>
            <header
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "0 16px",
                    borderBottom: "1px solid #eee",
                    background: "#fff",
                }}
            >
                <Link to="/" style={{ fontWeight: 800, textDecoration: "none", color: "#111" }}>
                    Scenario Studio
                </Link>
            </header>

            {/* React Flow 관련 훅/컴포넌트가 아래에 있으므로 Provider로 감쌈 */}
            <div style={{ position: "relative", minHeight: 0 }}>
                <ReactFlowProvider>
                    <Outlet />
                </ReactFlowProvider>

                {/* 노드가 선택되면 우측 드로어 표시 (오버레이) */}
                {selectedNode && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 360,
                            background: "#fff",
                            zIndex: 100,
                        }}
                    >
                        <RightDrawer width={360} />
                    </div>
                )}
            </div>
        </div>
    );
}
