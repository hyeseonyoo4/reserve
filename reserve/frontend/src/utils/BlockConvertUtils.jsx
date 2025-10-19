// 타입 정규화 유틸
import {Block} from "../components/type/BlockType.js";

const normalizeKey = (v) => String(v ?? "").trim().toUpperCase();

export const convertBlockToNodeEdge = (blocks = []) => {
    const nodes = blocks.map((block) => {
        const nodeType = normalizeKey(block.type) || "FREE";

        console.log(block.name, block);
        return {
            id: String(block.id),
            type: nodeType, // ← 'start' | 'split' | ...
            position: { x: Number(block.x ?? 0), y: Number(block.y ?? 0) },
            data: {
                data: new Block(block), // 원본 block 보관(선택)
                label: block.type ?? "블록",
                type: nodeType, // ← 내부 데이터도 소문자 타입로
                // content: block.name ?? block.type ?? "",
            },
        };
    });

    console.log(nodes);

    const edges = [];
    blocks.forEach((block) => {
        const src = String(block.id);
        const type = normalizeKey(block.type);

        if (type === "SPLIT") {
            const quarterInfo = block.quarterInfo;
            // 기본 연결
            if (quarterInfo?.defaultConnectId) {
                edges.push({
                    id: `e${src}-${quarterInfo.defaultConnectId}`,
                    source: src,
                    target: String(quarterInfo.defaultConnectId),
                    type: "editable",
                    label: "기본연결",
                    data: { label: "기본연결", isDefault: true }, // ← 저장 변환에서 사용
                });
            }
            // 분기 연결들
            (quarterInfo?.quarters ?? []).forEach((quarter) => {
                if (!quarter?.connectId) return;
                edges.push({
                    id: `e${src}-${quarter.connectId}`,
                    source: src,
                    target: String(quarter.connectId),
                    type: "editable",
                    label: quarter.name ?? "분기",
                    data: { label: quarter.name ?? null },
                });
            });
        } else if (block.nextId) {
            edges.push({
                id: `e${src}-${block.nextId}`,
                source: src,
                target: String(block.nextId),
            });
        }
    });

    return { nodes, edges };
};


export function convertNodesEdgesToBlocks(nodes = [], edges = []) {
    const outgoingBySource = new Map();
    for (const e of edges) {
        if (!outgoingBySource.has(e.source)) outgoingBySource.set(e.source, []);
        outgoingBySource.get(e.source).push(e);
    }

    const get = (obj, path, fallback = undefined) => {
        try {
            return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj) ?? fallback;
        } catch {
            return fallback;
        }
    };

    return nodes.map((n) => {
        // data.type이 소문자일 수 있으니 대문자로 정규화
        const rawType = get(n, "data.type") || n.type;
        const type = typeof rawType === "string" ? rawType.toUpperCase() : "FREE";

        const block = {
            ...n.data.data,
            x: get(n, "position.x", 0),
            y: get(n, "position.y", 0),
        };

        const outs = outgoingBySource.get(n.id) || [];

        if (type === "SPLIT") {
            block.quarterInfo = { defaultConnectId: null, quarters: [] };
            block.quarterInfo.quarters = outs.map((e, idx) => ({
                connectId: e.target,
                name:
                    get(e, "data.label") ||
                    get(e, "data.name") ||
                    e.sourceHandle ||
                    `branch${idx + 1}`,
            }));
        } else if (type !== "END") {

            const nextEdge =
                outs.find((e) => get(e, "data.isDefault") === true) ||
                outs.find((e) => e.sourceHandle === "default") ||
                outs[0];
            if (nextEdge) block.nextId = nextEdge.target;
        }

        return block;
    });
}
