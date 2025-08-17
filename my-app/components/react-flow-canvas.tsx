"use client"

import type React from "react"
import { useCallback, useRef, useState } from "react"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { CustomNode } from "./custom-node"

const nodeTypes = {
  custom: CustomNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 100 },
    data: {
      label: "시작",
      type: "start",
      content: "시나리오가 시작됩니다.",
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 250, y: 250 },
    data: {
      label: "대화",
      type: "dialog",
      content: "안녕하세요! 무엇을 도와드릴까요?",
    },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 100, y: 400 },
    data: {
      label: "선택 A",
      type: "branch",
      content: "옵션 A를 선택했습니다.",
    },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 400, y: 400 },
    data: {
      label: "선택 B",
      type: "branch",
      content: "옵션 B를 선택했습니다.",
    },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", label: "A 선택" },
  { id: "e2-4", source: "2", target: "4", label: "B 선택" },
]

export function ReactFlowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow")

      if (typeof type === "undefined" || !type) {
        return
      }

      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const newNode: Node = {
          id: `${nodes.length + 1}`,
          type: "custom",
          position,
          data: {
            label: getNodeLabel(type),
            type: type,
            content: getNodeContent(type),
          },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [reactFlowInstance, nodes.length, setNodes],
  )

  const getNodeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      dialog: "대화",
      branch: "분기",
      timer: "타이머",
      complete: "완료",
    }
    return labels[type] || "새 노드"
  }

  const getNodeContent = (type: string) => {
    const contents: { [key: string]: string } = {
      dialog: "새로운 대화 내용을 입력하세요.",
      branch: "조건을 설정하세요.",
      timer: "타이머 시간을 설정하세요.",
      complete: "시나리오가 완료되었습니다.",
    }
    return contents[type] || "내용을 입력하세요."
  }

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data?.type) {
              case "start":
                return "#10b981"
              case "dialog":
                return "#3b82f6"
              case "branch":
                return "#f59e0b"
              case "timer":
                return "#8b5cf6"
              case "complete":
                return "#ef4444"
              default:
                return "#6b7280"
            }
          }}
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
