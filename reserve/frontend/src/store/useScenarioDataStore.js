import { create } from "zustand"

export const useScenarioDataStore = create((set, get) => ({
    nodes: [],
    edges: [],

    // React Flow의 상태 변경 함수를 그대로 받을 수 있도록 "업데이트 함수" 형태 허용
    setNodes: (updater) =>
        set((state) => ({
            nodes: typeof updater === 'function' ? updater(state.nodes) : updater,
        })),

    setEdges: (updater) =>
        set((state) => ({
            edges: typeof updater === 'function' ? updater(state.edges) : updater,
        })),

    // 편의 함수: 특정 노드/엣지만 바꾸고 싶을 때
    setNode: (id, patchOrUpdater) =>
        set((state) => ({
            nodes: state.nodes.map((n) => {
                if (n.id !== id) return n;
                const next =
                    typeof patchOrUpdater === 'function'
                        ? patchOrUpdater(n)
                        : { ...n, ...patchOrUpdater }; // position, type 등 상위 필드 패치
                // data만 바꾸고 싶다면: { ...n, data: { ...n.data, ...patchOrUpdater } }
                return next;
            }),
        })),

    setNodeData: (id, updater) =>
        set((state) => ({
            nodes: state.nodes.map((n) => {
                if (n.id !== id) return n;
                return { ...n, data: typeof updater === 'function' ? updater(n.data) : { ...n.data, ...updater } };
            })
        })),

    setEdge: (id, patchOrUpdater) =>
        set((state) => ({
            edges: state.edges.map((e) => {
                if (e.id !== id) return e;
                return typeof patchOrUpdater === 'function' ? patchOrUpdater(e) : { ...e, ...patchOrUpdater };
            }),
        })),

    reset: () => set({ nodes: [], edges: [] }),
}));
