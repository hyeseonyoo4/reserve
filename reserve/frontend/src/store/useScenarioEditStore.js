import { create } from "zustand"

export const TargetComponentType = {
    TITLE: "TITLE",
    TEXT: "TEXT",
    SLIDE_TOGGLE: "SLIDE_TOGGLE",
};

export const useScenarioEditStore = create((set) => ({
    currentNode: null,
    setCurrentNode: (node) => set({ currentNode: node }),

    target: null,
    setTarget: (type) => set({ target: type }),
}))
