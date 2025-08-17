"use client"

import { memo, useState } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, GitBranch, Timer, CheckCircle, Play, Edit3, X } from "lucide-react"

interface CustomNodeData {
  label: string
  type: string
  content: string
}

export const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data.label)
  const [content, setContent] = useState(data.content)

  const getIcon = () => {
    switch (data.type) {
      case "start":
        return <Play className="w-4 h-4" />
      case "dialog":
        return <MessageSquare className="w-4 h-4" />
      case "branch":
        return <GitBranch className="w-4 h-4" />
      case "timer":
        return <Timer className="w-4 h-4" />
      case "complete":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getColor = () => {
    switch (data.type) {
      case "start":
        return "bg-green-100 border-green-300"
      case "dialog":
        return "bg-blue-100 border-blue-300"
      case "branch":
        return "bg-yellow-100 border-yellow-300"
      case "timer":
        return "bg-purple-100 border-purple-300"
      case "complete":
        return "bg-red-100 border-red-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  const getBadgeColor = () => {
    switch (data.type) {
      case "start":
        return "bg-green-500"
      case "dialog":
        return "bg-blue-500"
      case "branch":
        return "bg-yellow-500"
      case "timer":
        return "bg-purple-500"
      case "complete":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleSave = () => {
    // 여기서 노드 데이터를 업데이트하는 로직을 구현
    data.label = label
    data.content = content
    setIsEditing(false)
  }

  return (
    <Card className={`min-w-[200px] max-w-[300px] ${getColor()} ${selected ? "ring-2 ring-blue-500" : ""}`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            {isEditing ? (
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="h-6 text-sm font-medium"
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            ) : (
              <CardTitle className="text-sm font-medium">{data.label}</CardTitle>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Badge className={`text-xs ${getBadgeColor()}`}>{data.type}</Badge>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <X className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-xs resize-none"
            rows={3}
            onBlur={handleSave}
          />
        ) : (
          <p className="text-xs text-gray-600 line-clamp-3">{data.content}</p>
        )}
      </CardContent>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  )
})

CustomNode.displayName = "CustomNode"
