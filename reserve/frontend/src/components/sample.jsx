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

export const convertBlockToNodeEdge = (blocks) => {
    const nodes = blocks.map(block => {
        return {
            id: block.id,
            type: "custom",
            position: { x: block.x, y: block.y },
            data: {
                data: block,
                label: block.name ?? block.type,
                type: block.type,
                content: block.name ?? block.type,
            }
        }
    })
    const edges = [];
    blocks.forEach(block => {
        // { id: "e1-2", source: "AAAA", target: "BBBB", animated: true },
        if(block.nextId) {
            edges.push({ id: `e${block.id}-${block.nextId}`, source: block.id, target: block.nextId }) }
        else if(block.type === "SPLIT" && block.quarterInfo) {
            edges.push({
                id: `e${block.id}-${block.quarterInfo.defaultConnectId}`,
                source: block.id,
                target: block.quarterInfo.defaultConnectId,
                label: "기본연결"
            })
            block.quarterInfo.quarters.forEach(quarter => {
                edges.push({
                    id: `e${block.id}-${quarter.connectId}`,
                    source: block.id,
                    target: quarter.connectId,
                    label: quarter.name || "분기"
                })
            })
        }
    })
    return { nodes, edges };
};


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