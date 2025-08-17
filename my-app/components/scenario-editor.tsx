"use client"

import * as React from "react"
import {
  FileText,
  Folder,
  Settings,
  Plus,
  Play,
  Save,
  Download,
  Upload,
  Layers,
  GitBranch,
  MessageSquare,
  Timer,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactFlowCanvas } from "./react-flow-canvas"

const menuData = {
  projects: [
    { title: "새 시나리오", icon: Plus, action: "new" },
    { title: "시나리오 열기", icon: Folder, action: "open" },
    { title: "최근 파일", icon: FileText, action: "recent" },
  ],
  templates: [
    { title: "기본 대화", icon: MessageSquare, action: "dialog" },
    { title: "조건 분기", icon: GitBranch, action: "branch" },
    { title: "타이머 이벤트", icon: Timer, action: "timer" },
    { title: "완료 노드", icon: CheckCircle, action: "complete" },
  ],
  tools: [
    { title: "실행", icon: Play, action: "run" },
    { title: "저장", icon: Save, action: "save" },
    { title: "내보내기", icon: Download, action: "export" },
    { title: "가져오기", icon: Upload, action: "import" },
  ],
  settings: [
    { title: "레이어 관리", icon: Layers, action: "layers" },
    { title: "환경설정", icon: Settings, action: "settings" },
  ],
}

export function ScenarioEditor() {
  const [selectedProject, setSelectedProject] = React.useState("새 시나리오")

  const handleMenuAction = (action: string, title: string) => {
    console.log(`Action: ${action}, Title: ${title}`)
    // 여기에 각 메뉴 액션에 대한 로직을 구현
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex flex-col gap-2 px-2 py-2">
            <h2 className="text-lg font-semibold">시나리오 저작도구</h2>
            <div className="flex flex-col gap-1">
              <Label htmlFor="project-name" className="text-xs">
                프로젝트명
              </Label>
              <Input
                id="project-name"
                placeholder="프로젝트 이름을 입력하세요"
                className="h-8"
                defaultValue={selectedProject}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>프로젝트</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuData.projects.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleMenuAction(item.action, item.title)}
                      className="w-full justify-start"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>노드 템플릿</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuData.templates.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleMenuAction(item.action, item.title)}
                      className="w-full justify-start"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("application/reactflow", item.action)
                        e.dataTransfer.effectAllowed = "move"
                      }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>도구</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuData.tools.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleMenuAction(item.action, item.title)}
                      className="w-full justify-start"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>설정</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuData.settings.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleMenuAction(item.action, item.title)}
                      className="w-full justify-start"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">시나리오 편집기</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-1" />
              미리보기
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-1" />
              저장
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <ReactFlowCanvas />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
