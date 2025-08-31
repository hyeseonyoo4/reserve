// src/components/FlowCanvas.jsx
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
    ReactFlow, MiniMap, Controls, Background,
    addEdge, applyNodeChanges, applyEdgeChanges, BackgroundVariant,
    useViewport
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useStudioStore } from "../store";
import { CustomNode } from "./custom";
import {convertBlockToNodeEdge, sampleBlocks} from "./sample.jsx";
import axiosInstance from "../utils/axios.js";

const nodeTypes = { custom: CustomNode };

/** 메뉴에 표시할 타입 목록 */
export const BLOCK_TYPES = [
    { key: "START",   label: "시작" },
    { key: "SELECT",  label: "선택" },
    { key: "FORM",    label: "폼입력" },
    { key: "FREE",    label: "자유폼" },   // FREE → "자유폼"
    { key: "API",     label: "API" },
    { key: "SPLIT",   label: "분기" },
    { key: "MESSAGE", label: "메시지" },
    { key: "END",     label: "끝" },
];

/** 타입키 → 한글 라벨 매핑 */
const LABEL_BY_KEY = BLOCK_TYPES.reduce((acc, cur) => {
    acc[cur.key] = cur.label;
    return acc;
}, {});


const makeNodeDataByType = (rawKey) => {
    const KEY = String(rawKey || "").trim().toUpperCase();
    const label = LABEL_BY_KEY[KEY] ?? "블록";
    return { label, type: KEY.toLowerCase(), content: "" };
};

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

export default function ReactFlowCanvas({scenarioId}) {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    // { parentId, left, top } 또는 null — 노드 사이 중앙에 띄울 메뉴 좌표
    const [typeMenu, setTypeMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null)

    const openDrawer = useStudioStore((s) => s.openDrawer);
    const { x: vx, y: vy, zoom } = useViewport();

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onDrop = useCallback(
        (event) => {
            event.preventDefault()

            console.log("onDrop", event)

            const type = event.dataTransfer.getData("application/reactflow")

            if (typeof type === "undefined" || !type) {
                return
            }

            console.log("reactFlowInstance", reactFlowInstance)
            console.log("reactFlowWrapper", reactFlowWrapper)

            const getNodeLabel = (typeKey) => {
                const KEY = String(typeKey || "").trim().toUpperCase();
                console.log("getNodeLabel", KEY)
                return LABEL_BY_KEY[KEY] ?? "블록";
            };
            const getNodeContent = (typeKey) => {
                const KEY = String(typeKey || "").trim().toUpperCase();
                if (KEY === "START") return "시나리오 시작";
                if (KEY === "END")   return "시나리오 종료";
                return "";
            };

            if (reactFlowWrapper.current && reactFlowInstance) {
                const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
                const position = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                })

                const newNode = {
                    id: `${nodes.length + 1}`,
                    type: "custom",
                    position,
                    data: {
                        label: getNodeLabel(type),
                        type: type,
                        content: getNodeContent(type),
                    },
                }

                console.log("newNode", newNode)

                setNodes((nds) => nds.concat(newNode))
            }
        },
        [reactFlowInstance, nodes.length, setNodes],
    )

    // 단일 클릭으로도 드로어 열리게
    const onNodeClick = useCallback((_, node) => openDrawer(node), [openDrawer]);

    const onDragOver = useCallback((e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }, []);


    const addNextNode = useCallback((parentId, typeKey) => {
        const childId = newId();
        let created = null;

        setNodes((nds) => {
            const parent = nds.find((n) => n.id === parentId);
            if (!parent) return nds;

            const newNode = {
                id: childId,
                type: "custom",
                position: { x: parent.position.x + 320, y: parent.position.y }, // 오른쪽에 배치
                data: makeNodeDataByType(typeKey),//타입키를 대문자로 정규화
            };
            created = newNode;
            return [...nds, newNode];
        });

        setEdges((eds) =>
            addEdge({ id: `${parentId}->${childId}`, source: parentId, target: childId }, eds)
        );

        if (created) openDrawer(created); // 새로 만든 노드 상세 자동 오픈
    }, [openDrawer]);


    const removeNode = useCallback((nodeId) => {
        setNodes((nds) => nds.filter((n) => n.id !== nodeId));
        setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    }, []);


    const openTypeMenuAtMid = useCallback((parentId) => {
        const parent = nodes.find((n) => n.id === parentId);
        if (!parent) return;

        const newX = parent.position.x + 320;
        const newY = parent.position.y;

        const midFlowX = (parent.position.x + newX) / 2;
        const midFlowY = (parent.position.y + newY) / 2;

        // flow 좌표 → 화면 기준 px
        const left = midFlowX * zoom + vx;
        const top  = midFlowY * zoom + vy;

        setTypeMenu({ parentId, left, top });
    }, [nodes, vx, vy, zoom]);

    // 팬/줌 변하면 메뉴 닫기(좌표 어긋남 방지)
    useEffect(() => { setTypeMenu(null); }, [vx, vy, zoom]);

    useEffect(() => {
        axiosInstance.get(`/api/v1/blocks/scenario/${scenarioId}`).then(
            (res) => {
                if(res.data.code === "0000") {
                    const elements = res.data.data.elements ?? [];
                    const { nodes: loadedNodes, edges: loadedEdges } = convertBlockToNodeEdge(elements);
                    // const {nodes: loadedNodes, edges: loadedEdges} = convertBlockToNodeEdge(sampleBlocks)
                    setNodes(loadedNodes);
                    setEdges(loadedEdges);
                }
            }
        )
    }, [scenarioId]);


    const nodesWithHandlers = useMemo(
        () =>
            nodes.map((n) => ({
                ...n,
                data: {
                    ...n.data,
                    // 구버전 'onAdd(id)' 호출도 지원: typeKey 없으면 메뉴만 연다
                    onAdd: (parentId, typeKey) => {
                        if (!typeKey) return openTypeMenuAtMid(parentId);
                        return addNextNode(parentId, typeKey);
                    },
                    // 별도 메뉴 트리거를 쓰는 경우
                    onAddClick: (parentId) => openTypeMenuAtMid(parentId),
                    onDelete: removeNode,
                },
            })),
        [nodes, openTypeMenuAtMid, addNextNode, removeNode]
    );


    const pickType = (typeKey) => {
        if (!typeMenu) return;
        addNextNode(typeMenu.parentId, typeKey);
        setTypeMenu(null);
    };

    return (
        <div
            ref={reactFlowWrapper}
            style={{ position: "relative", width: "100%", height: "calc(100% - 40px)" }}
        >
            <ReactFlow
                nodes={nodesWithHandlers}
                edges={edges}
                nodeTypes={nodeTypes}
                onInit={setReactFlowInstance}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onDragOver={onDragOver}
                fitView
                style={{ background: "#f9fafb" }}
                onDrop={onDrop}
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            </ReactFlow>

            {typeMenu && (
                <div
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        position: "absolute",
                        left: typeMenu.left,
                        top: typeMenu.top,
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                        boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                        padding: 8,
                    }}
                >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {BLOCK_TYPES.map((b) => (
                            <button
                                key={b.key}
                                onClick={() => pickType(b.key)}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 10,
                                    padding: "8px 10px",
                                    background: "#fff",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                            >
                                {b.key}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setTypeMenu(null)}
                        style={{
                            marginTop: 10,
                            width: "100%",
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: "8px 10px",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        닫기
                    </button>
                </div>
            )}
        </div>
    );
}
