import { create } from "zustand"

export const useStudioStore = create((set) => ({
    // 현재 선택된 시나리오
    scenarioId: null,
    setScenarioId: (id) => set({ scenarioId: id }),

    // Drawer(상세) 상태
    drawerOpen: false,
    selectedNode: null,
    openDrawer: (node) => set({ drawerOpen: true, selectedNode: node }),
    closeDrawer: () => set({ drawerOpen: false, selectedNode: null }),

    // 노드 업데이트(상세 폼에서 저장)
    updateNodeData: (updater) =>
        set((state) => {
            if (!state.selectedNode) return {}
            const next = { ...state.selectedNode, data: { ...state.selectedNode.data, ...updater } }
            return { selectedNode: next }
        }),
}))
