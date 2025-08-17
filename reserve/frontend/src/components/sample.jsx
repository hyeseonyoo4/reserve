const blocks = [
    {
        "id": "AAAA",
        "type": "START",
        "nextId": "BBBB",
        "x": 100,
        "y": 100,
    },
    {
        "id": "BBBB",
        "type": "SPLIT",
        "quarterInfo": {
            "defaultConnectId": "1",
            "quarters": [
                {
                    "connectId": "2"
                },
                {
                    "connectId": "3"
                }
            ]
        },
        "x": 100,
        "y": 100,
    },
    {
        "id": "1",
        "x": 100,
        "y": 100,
    },
    {
        "id": "2",
        "x": 100,
        "y": 100,
    },
    {
        "id": "3",
        "x": 100,
        "y": 100,
    }
]

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
        data: { label: "분기 C", type: "MESSAGE", content: "C로 진행" }
    }
]

const blockEdges = [
    { id: "e1-2", source: "AAAA", target: "BBBB", animated: true },
    { id: "e2-1", source: "BBBB", target: "1", label: "A" },
    { id: "e2-2", source: "BBBB", target: "2", label: "B" },
    { id: "e2-3", source: "BBBB", target: "3", label: "C" }
]





const initialNodes = [
    { id: "1", type: "custom", position: { x: 200, y: 100 }, data: { label: "시작", type: "start", content: "시나리오 시작" } },
    { id: "2", type: "custom", position: { x: 200, y: 240 }, data: { label: "대화", type: "dialog", content: "무엇을 도와드릴까요?" } },
    { id: "3", type: "custom", position: { x: 50,  y: 380 }, data: { label: "분기 A", type: "branch", content: "A로 진행" } },
    { id: "4", type: "custom", position: { x: 350, y: 380 }, data: { label: "분기 B", type: "branch", content: "B로 진행" } },
]

const initialEdges = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e2-3", source: "2", target: "3", label: "A" },
    { id: "e2-4", source: "2", target: "4", label: "B" },
]