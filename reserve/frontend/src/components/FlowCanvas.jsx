import React, { useCallback, useRef, useState } from "react"
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useStudioStore } from "../store"
import { CustomNode } from "./custom"

const nodeTypes = { custom: CustomNode }

const initialNodes = [
    { id: "1", type: "custom", position: { x: 200, y: 100 }, data: { label: "시작", type: "start", content: "시나리오 시작" } },
    { id: "2", type: "custom", position: { x: 200, y: 240 }, data: { label: "대화", type: "dialog", content: "무엇을 도와드릴까요?" } },
    { id: "3", type: "custom", position: { x: 50,  y: 380 }, data: { label: "분기 A", type: "branch", content: "A로 진행" } },
    { id: "4", type: "custom", position: { x: 350, y: 380 }, data: { label: "분기 B", type: "branch", content: "B로 진행" } },
]

const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3", label: "A" },
    { id: "e2-4", source: "2", target: "4", label: "B" },
]

export default function ReactFlowCanvas() {
    const wrapRef = useRef(null)
    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)
    const [rf, setRf] = useState(null)

    const openDrawer = useStudioStore((s) => s.openDrawer)

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

    const onNodeDoubleClick = useCallback((_, node) => {
        // 상세 열기
        openDrawer(node)
    }, [openDrawer])

    const onDragOver = useCallback((e) => {
        e.preventDefault(); e.dataTransfer.dropEffect = "move"
    }, [])

    return (
        <div ref={wrapRef} style={{ width: "100%", height: "calc(100% - 40px)" /* 헤더 40px 만큼 제외 */ }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onInit={setRf}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDoubleClick={onNodeDoubleClick}
                onDragOver={onDragOver}
                fitView
                style={{ background: "#f9fafb" }}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}
