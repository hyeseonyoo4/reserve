export const sampleBlocks = [
    {
        "id": "AAAA",
        "type": "START",
        "name": "시나리오 시작",
        "nextId": "BBBB",
        "x": 0,
        "y": 0,
    },
    {
        "id": "BBBB",
        "type": "SPLIT",
        "name": "분기 처리",
        "quarterInfo": {
            "defaultConnectId": "1",
            "quarters": [
                {
                    "connectId": "2",
                    "name": "2번 연결"
                },
                {
                    "connectId": "3",
                    "name": "3번 연결"
                }
            ]
        },
        "x": 0,
        "y": 300,
    },
    {
        "id": "1",
        "type": "MESSAGE",
        "name": null,
        "nextId": "3",
        "x": 300,
        "y": 600,
    },
    {
        "id": "2",
        "type": "MESSAGE",
        "nextId": "3",
        "x": -300,
        "y": 600,
    },
    {
        "id": "3",
        "type": "END",
        "x": 0,
        "y": 600,
    }
]

// 타입 정규화 유틸
const normalizeKey = (v) => String(v ?? "").trim().toUpperCase();
const toNodeType = (v) => normalizeKey(v).toLowerCase(); // reactflow node.type 용

export const convertBlockToNodeEdge = (blocks = []) => {
    const nodes = blocks.map((block) => {
        const nodeType = toNodeType(block.type) || "free";
        return {
            id: String(block.id),
            type: nodeType, // ← 'start' | 'split' | ...
            position: { x: Number(block.x ?? 0), y: Number(block.y ?? 0) },
            data: {
                data: block, // 원본 block 보관(선택)
                label: block.name ?? block.type ?? "블록",
                type: nodeType, // ← 내부 데이터도 소문자 타입로
                content: block.name ?? block.type ?? "",
            },
        };
    });

    const edges = [];
    blocks.forEach((block) => {
        const src = String(block.id);
        const t = normalizeKey(block.type);

        if (t === "SPLIT") {
            const qi = block.quarterInfo;
            // 기본 연결
            if (qi?.defaultConnectId) {
                edges.push({
                    id: `e${src}-${qi.defaultConnectId}`,
                    source: src,
                    target: String(qi.defaultConnectId),
                    type: "editable",
                    label: "기본연결",
                    data: { label: "기본연결", isDefault: true }, // ← 저장 변환에서 사용
                });
            }
            // 분기 연결들
            (qi?.quarters ?? []).forEach((q) => {
                if (!q?.connectId) return;
                edges.push({
                    id: `e${src}-${q.connectId}`,
                    source: src,
                    target: String(q.connectId),
                    type: "editable",
                    label: q.name ?? "분기",
                    data: { label: q.name ?? null },
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
            id: n.id,
            type,                                   // START | SELECT | FORM | FREE | API | SPLIT | MESSAGE | END
            name: get(n, "data.label", ""),
            description: get(n, "data.content", ""),
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

// block 데이터를 바탕으로 노드와 엣지 생성
const blockNodes = [
    {
        id: "AAAA",
        type: "custom",
        position: { x: 100, y: 100 },
        data: { label: "시작", type: "START", content: "시나리오 시작" }
    },
    {
        id: "BBBB",
        type: "custom",
        position: { x: 100, y: 240 },
        data: { label: "분기", type: "SPLIT", content: "분기 처리" }
    },
    {
        id: "1",
        type: "custom",
        position: { x: 50, y: 380 },
        data: { label: "분기 A", type: "MESSAGE", content: "A로 진행" }
    },
    {
        id: "2",
        type: "custom",
        position: { x: 200, y: 380 },
        data: { label: "분기 B", type: "MESSAGE", content: "B로 진행" }
    },
    {
        id: "3",
        type: "custom",
        position: { x: 350, y: 380 },
        data: { label: "분기 C", type: "END", content: "C로 진행" }
    }
]

const blockEdges = [
    { id: "e1-2", source: "AAAA", target: "BBBB", animated: true },
    { id: "e2-1", source: "BBBB", target: "1", label: "A" },
    { id: "e2-2", source: "BBBB", target: "2", label: "B" },
    { id: "e2-3", source: "BBBB", target: "3", label: "C" },
    { id: "e1-3", source: "1", target: "3", animated: true },
    { id: "e2-3", source: "2", target: "3", animated: true },
]