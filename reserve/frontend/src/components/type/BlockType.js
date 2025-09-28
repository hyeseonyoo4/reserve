// BlockType Enum 정의
export const BlockType = {
    START: 'START',
    SELECT: 'SELECT',
    FORM: 'FORM',
    FREE: 'FREE',
    API: 'API',
    SPLIT: 'SPLIT',
    MESSAGE: 'MESSAGE',
    END: 'END',
};

// ChatDisplayType Enum
export const ChatDisplayType = {
    CARD: 'CARD', // 카드
    LIST: 'LIST', // 리스트
    GRID: 'GRID', // 그리드
};

// ButtonActionType Enum
export const ButtonActionType = {
    URL_OPEN: 'URL_OPEN', // URL 오픈
    FILE_DOWNLOAD: 'FILE_DOWNLOAD', // 파일 다운로드
    COUNSEL: 'COUNSEL', // 상담사 연결
    QUESTION_SELECT: 'QUESTION_SELECT', // 질문지 선택
    TEL: 'TEL', // 전화 연결
    EMAIL: 'EMAIL', // 이메일 전송
    JUMP: 'JUMP', // 시나리오 점프
};



// FreeBlockInfo 클래스
export class FreeBlockInfo {
    constructor({ id = '', question = null, parameterKey = '' } = {}) {
        this.id = id; // 유일한 식별자
        this.question = question ? new Bubble(question) : null; // 질문 (Bubble 객체)
        this.parameterKey = parameterKey; // 사용자 입력값을 저장할 파라미터 키
    }
}

// MessageBlockInfo 클래스
export class MessageBlockInfo {
    constructor({ id = '', messages = [] } = {}) {
        this.id = id;
        this.messages = messages === null || messages.length === 0
            ? []
            : messages.map(message => new Bubble(message)); // 메시지 배열
    }
}

// Bubble 클래스
export class Bubble {
    constructor({
                    id = '',
                    style = ChatDisplayType.CARD, // Default style
                    order = 0,
                    imagePath = '', // 이미지 경로
                    text = '', // 텍스트 내용
                    buttons = [], // 버튼 리스트
                } = {}) {
        this.id = id; // Bubble ID
        this.style = Object.values(ChatDisplayType).includes(style) ? style : ChatDisplayType.CARD; // 스타일
        this.order = order; // 순서
        this.imagePath = imagePath; // 이미지 경로
        this.text = text; // 텍스트
        this.buttons = buttons === null ? [] : buttons.map((btn) => new Button(btn)); // 버튼 리스트 (Button 객체로 생성)

        console.log(imagePath);
    }
}


// Button 클래스
export class Button {
    constructor({
                    id = '',
                    order = 0,
                    text = '',
                    action = ButtonActionType.CHAT, // 액션 타입 (Enum 사용)
                    actionValue = '', // 액션 수행에 필요한 값 (e.g., URL, 파일 경로)
                } = {}) {
        this.id = id; // 버튼 ID
        this.order = order; // 버튼 순서
        this.text = text; // 버튼 텍스트
        this.action = action; // Button 액션 타입 (Enum)
        this.actionValue = actionValue; // 액션 관련 값
    }
}



// SelectBlock 클래스
export class SelectBlock {
    constructor({
                    id = '',
                    questions = [],
                    questionCount = 0,
                    isRepresentative = false,
                    parameterKey = '',
                } = {}) {
        this.id = id;
        this.questions = questions; // 선택지 블록 질문 배열
        this.questionCount = questionCount; // 질문 개수
        this.isRepresentative = isRepresentative; // 대표 질문 여부
        this.parameterKey = parameterKey; // 시나리오 파라미터 키
    }
}

// InsertForm 클래스
export class InsertForm {
    constructor({ fields = [] } = {}) {
        this.fields = fields; // 폼 필드 배열
    }
}



// Quarter 클래스
export class Quarter {
    constructor({ divisions = [] } = {}) {
        this.divisions = divisions; // 쿼터 정보
    }
}

// Block 클래스
export class Block {
    constructor({
                    id = '',
                    type = BlockType.FREE,
                    name = '',
                    description = '',
                    nextId = null,
                    x = 0,
                    y = 0,
                    freeBlockInfo = null,
                    selectBlock = null,
                    formInfo = null,
                    messageBlockInfo = null,
                    quarterInfo = null,
                } = {}) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.nextId = nextId;
        this.x = x; // x 좌표
        this.y = y; // y 좌표
        this.freeBlockInfo = freeBlockInfo
            ? new FreeBlockInfo(freeBlockInfo)
            : BlockType.FREE === type
                ? new FreeBlockInfo()
                : null;
        this.selectBlock = selectBlock ? new SelectBlock(selectBlock) : null;   // TODO: SelectBlock 일때
        this.formInfo = formInfo ? new InsertForm(formInfo) : null; // TODO: FormBlock 일때
        this.messageBlockInfo = messageBlockInfo
            ? new MessageBlockInfo(messageBlockInfo)
            : null;
        this.quarterInfo = quarterInfo ? new Quarter(quarterInfo) : null;
    }

    // 좌표 업데이트
    updateCoordinates(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    // 다음 블럭 설정
    setNextBlock(nextBlockId) {
        this.nextId = nextBlockId;
    }
}