import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import {
    ReactFlow, MiniMap, Controls, Background,
    addEdge, applyNodeChanges, applyEdgeChanges, BackgroundVariant,
    useViewport
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useStudioStore } from "../store";
import { CustomNode } from "./node/custom.jsx";
import {
    convertBlockToNodeEdge,
    convertNodesEdgesToBlocks,
} from "../utils/BlockConvertUtils.jsx";
import axiosInstance from "../utils/axios.js";
import EditableEdge from "./edge/EditableEdge.jsx";
import {SplitNode} from "./node/SplitNode.jsx";
import {StartNode} from "./node/StartNode.jsx";
import {EndNode} from "./node/EndNode.jsx";

// ── (1) 타입별 nodeTypes 등록 ───────────────────────────────
const nodeTypes = {
    START: StartNode,
    SELECT: CustomNode,
    FORM: CustomNode,
    FREE: CustomNode,
    API: CustomNode,
    SPLIT: SplitNode,
    MESSAGE: CustomNode,
    END: EndNode,
    // (구버전 호환)
    // custom: CustomNode,
};

const edgeTypes = { editable: EditableEdge };

/** 메뉴에 표시할 타입 목록 */
export const BLOCK_TYPES = [
    { key: "START",   label: "시작" },
    { key: "SELECT",  label: "선택" },
    { key: "FORM",    label: "폼입력" },
    { key: "FREE",    label: "자유폼" },
    { key: "API",     label: "API" },
    { key: "SPLIT",   label: "분기" },
    { key: "MESSAGE", label: "메시지" },
    { key: "END",     label: "끝" },
];

/** 키 정규화/매핑 유틸 */
const normalizeKey = (raw) => String(raw || "").trim().toUpperCase();

/** 타입키 → 한글 라벨 매핑 */
const LABEL_BY_KEY = BLOCK_TYPES.reduce((acc, cur) => {
    acc[cur.key] = cur.label;
    return acc;
}, {});

const makeNodeDataByType = (rawKey) => {
    const KEY = normalizeKey(rawKey);
    const label = LABEL_BY_KEY[KEY] ?? "블록";
    return { label, type: KEY.toLowerCase(), content: "" };
};

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

export default function ReactFlowCanvas({ scenarioId }) {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [typeMenu, setTypeMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [saving, setSaving] = useState(false);

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
        (params) => {
            if (nodes.find(n => n.id === params.target)?.data.type === "START") {
                alert("시작 노드로 연결할 수 없습니다.");
                return;
            }
            if (nodes.find(x => x.id === params.source)?.data.type === "SPLIT") {
                params.type = "editable";
                params.data = { label: null };
            }
            setEdges((eds) => addEdge(params, eds));
        },
        [nodes]
    );

    // ── (2) DnD로 노드 추가: node.type을 타입명으로 매핑 ───────
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const draggedType = event.dataTransfer.getData("application/reactflow");
            if (!draggedType) return;

            const getNodeLabel = (typeKey) => {
                const KEY = normalizeKey(typeKey);
                return LABEL_BY_KEY[KEY] ?? "블록";
            };
            const getNodeContent = (typeKey) => {
                const KEY = normalizeKey(typeKey);
                if (KEY === "START") return "시나리오 시작";
                if (KEY === "END") return "시나리오 종료";
                return "";
            };

            if (reactFlowWrapper.current && reactFlowInstance) {
                const bounds = reactFlowWrapper.current.getBoundingClientRect();
                const position = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX - bounds.left,
                    y: event.clientY - bounds.top,
                });

                const nodeType = normalizeKey(draggedType); // 'start' | 'select' | ...

                const newNode = {
                    id: `${nodes.length + 1}`,
                    type: nodeType, // ← 핵심
                    position,
                    data: {
                        label: getNodeLabel(draggedType),
                        type: nodeType, // 내부 데이터도 소문자 타입로 보관
                        content: getNodeContent(draggedType),
                    },
                };

                setNodes((nds) => nds.concat(newNode));
            }
        },
        [reactFlowInstance, nodes.length, setNodes]
    );

    const onNodeClick = useCallback((_, node) => openDrawer(node), [openDrawer]);
    const onDragOver = useCallback((e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }, []);
    //더블 클릭으로 삭제 기능 구현
    const onEdgeDoubleClick = useCallback((e, edge) => {
        e.stopPropagation();
        setEdges((eds) => eds.filter((ed) => ed.id !== edge.id));
    }, []);
    // ── (3) +추가 버튼으로 자식 만들 때도 node.type 일관성 ─────
    const addNextNode = useCallback((parentId, typeKey) => {
        const childId = newId();
        let created = null;

        setNodes((nds) => {
            const parent = nds.find((n) => n.id === parentId);
            if (!parent) return nds;

            const nodeType = normalizeKey(typeKey);
            const newNode = {
                id: childId,
                type: nodeType,
                position: { x: parent.position.x + 320, y: parent.position.y },
                data: makeNodeDataByType(typeKey),
            };
            created = newNode;
            return [...nds, newNode];
        });

        setEdges((eds) =>
            addEdge({ id: `${parentId}->${childId}`, source: parentId, target: childId }, eds)
        );

        if (created) openDrawer(created);
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

        const left = midFlowX * zoom + vx;
        const top  = midFlowY * zoom + vy;

        setTypeMenu({ parentId, left, top });
    }, [nodes, vx, vy, zoom]);

    useEffect(() => { setTypeMenu(null); }, [vx, vy, zoom]);

    // 시나리오 데이터 불러오기 (Blocks → nodes/edges)
    useEffect(() => {
        axiosInstance.get(`/api/v1/blocks/scenario/${scenarioId}`).then(
            (res) => {
                if (res.data.code === "0000") {
                    const elements = res.data.data.elements ?? [];
                    // convertBlockToNodeEdge에서 node.type / data.type을 소문자 타입으로 반환하도록 맞추세요.
                    const { nodes: loadedNodes, edges: loadedEdges } =
                        convertBlockToNodeEdge(elements);
                    setNodes(loadedNodes);
                    setEdges(loadedEdges);
                }
            }
        );
    }, [scenarioId]);

    // 저장 핸들러: nodes/edges → Blocks로 변환 후 전송
    const onSave = useCallback(async () => {
        try {
            setSaving(true);
            const blocks = convertNodesEdgesToBlocks(nodes, edges);
            const payload = [...blocks];

            const res = await axiosInstance.post(
                `/api/v1/blocks/scenario/${scenarioId}`,
                payload
            );

            if (res?.data?.code === "0000") {
                alert("저장 완료!");
            } else {
                alert("저장 응답이 비정상입니다.");
                console.warn("save response", res?.data);
            }
        } catch (err) {
            console.error(err);
            alert("저장 실패");
        } finally {
            setSaving(false);
        }
    }, [nodes, edges, scenarioId]);

    // CTRL/CMD + S 핫키로 저장
    useEffect(() => {
        const handler = (e) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            if ((isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s")) {
                e.preventDefault();
                onSave();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onSave]);

    const nodesWithHandlers = useMemo(
        () =>
            nodes.map((n) => ({
                ...n,
                data: {
                    ...n.data,
                    onAdd: (parentId, typeKey) => {
                        if (!typeKey) return openTypeMenuAtMid(parentId);
                        return addNextNode(parentId, typeKey);
                    },
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
            {/* 상단 우측 저장 버튼 */}
            <div style={{ position: "absolute", right: 12, top: 8, zIndex: 1100, display: "flex", gap: 8 }}>
                <button
                    onClick={onSave}
                    disabled={saving}
                    style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #e5e7eb",
                        background: saving ? "#f1f5f9" : "#fff",
                        cursor: saving ? "not-allowed" : "pointer",
                        boxShadow: "0 6px 16px rgba(0,0,0,.08)",
                    }}
                    title="Ctrl/Cmd + S"
                >
                    {saving ? "저장중..." : "저장"}
                </button>
            </div>

            <ReactFlow
                nodes={nodesWithHandlers}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onInit={setReactFlowInstance}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onDragOver={onDragOver}
                onEdgeDoubleClick={onEdgeDoubleClick}
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
