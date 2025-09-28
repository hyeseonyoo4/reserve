import { create } from "zustand"
import {BlockType} from "../components/type/BlockType.js";

export const TargetComponentType = {
    TITLE: "TITLE",
    IMAGE: "IMAGE",
    TEXT: "TEXT",
    BUTTON: "BUTTON",

};
export const useScenarioPopupStore = create((set) => ({
    // 팝업 열림 상태
    isOpen: false,
    // 현재 선택한 노드
    selectedNode: null,
    // 선택한 노드의 타입
    selectedNodeType: null,

    // 현재 선택한 노드의 타겟
    targetComponent: null,
    targetComponentIndex: [], // ex) MessageNode 첫번째 버블의 3번째 버튼 [0, 2]
    // Title (공통)






    openPopup: (node, type = null) => set({
        isOpen: true,
        selectedNode: node,
        selectedNodeType: type,
        targetComponent: null,
        targetComponentIndex: []
    }),
    closePopup: () => set({
        isOpen: false,
        selectedNode: null,
        selectedNodeType: null,
        targetComponent: null,
        targetComponentIndex: []
    }),
    setTargetComponent: (component, index = []) => set({ targetComponent: component, targetComponentIndex: index }),

    // // 현재 선택된 시나리오
    // scenarioId: null,
    // setScenarioId: (id) => set({ scenarioId: id }),



    // // Drawer(상세) 상태
    // openDrawer: (node) => set({ drawerOpen: true, selectedNode: node }),
    // closeDrawer: () => set({ drawerOpen: false, selectedNode: null }),

    // 노드 업데이트(상세 폼에서 저장)
    updateNodeData: (setNodes, updateData) =>
        set((state) => {
            if (!state.selectedNode) return {}

            setNodes(state.nodes.map((n) => {
                if(state.selectedNode.id === n.id) {
                    const result = {...n}

                    switch(state.selectedNodeType) {
                        case BlockType.FREE:
                            if(state.targetComponent === TargetComponentType.TITLE) {
                                result.data.data.name = updateData;
                            } else if(state.targetComponent === TargetComponentType.IMAGE) {
                                result.data.data.freeBlockInfo.question.imagePath = updateData;
                            } else if(state.targetComponent === TargetComponentType.TEXT) {
                                result.data.data.freeBlockInfo.question.text = updateData;
                            }
                            break;
                        case BlockType.MESSAGE:
                            if(state.targetComponent === TargetComponentType.TITLE) {
                                result.data.data.name = updateData.title;
                            } else if(state.targetComponent === TargetComponentType.IMAGE) {
                                result.data.data.messages[state.targetComponentIndex[0]].imagePath = updateData;
                            } else if(state.targetComponent === TargetComponentType.TEXT) {
                                result.data.data.messages[state.targetComponentIndex[0]].text = updateData;
                            } else if(state.targetComponent === TargetComponentType.BUTTON) {
                                result.data.data.messages[state.targetComponentIndex[0]].buttons[state.targetComponentIndex[1]] = updateData.button;
                            }
                            break;
                        default:
                            break;
                    }
                    return result;
                }
                return n;
            }))


            const next = { ...state.selectedNode, data: { ...state.selectedNode.data, ...updater } }
            return { selectedNode: next }
        }),

    // FreeNode -> 이미지 / 텍스트
    // MessageNode -> [버블순서, 버튼순서] 이미지 / 텍스트 / 버튼
    // useStore.setState((state) => ({
    //   nodes: state.nodes.map((n) => {
    //     n.id === selectedNodeI
    //         ? { ...n, data: { ...n.data, bubble[ } }
    //         : n
    //   }),
    // }));
}))
