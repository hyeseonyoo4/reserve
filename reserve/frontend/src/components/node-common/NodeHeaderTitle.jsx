import {TargetComponentType, useScenarioEditStore} from "../../store/useScenarioEditStore.js";
import TextInput from "../edit/TextInput.jsx";
import React from "react";

const NodeHeaderTitle = ({nodeData, label, blockType, onEditChange, onStartEdit, onEditEnd}) => {
    //
    // console.log(nodeData);
    const { currentNode, target, setCurrentNode, setTarget } =
        useScenarioEditStore((s) => s);
    return (
        <>
            {currentNode === nodeData?.id && target === TargetComponentType.TITLE ?
                (<div style={{display: "flex", gap: 12}}>
                    <span>[{(label || blockType).toString()}]</span>
                    <TextInput
                        value={nodeData.name}
                        onChange={(newText) => onEditChange(TargetComponentType.TITLE, newText)}
                        onBlur={onEditEnd}
                        placeholder="블록의 타이틀을 입력해주세요"
                        autoFocus
                        style={{
                            color: "#1f2937", // 텍스트 색상
                            borderBottom: "1px solid #3b82f6", // 파란색 밑줄 (활성화 강조)
                            padding: "2px",
                        }}
                    />
                </div>)
                :
                (<div style={{display: "flex", gap: 12}}>
                    <span style={{ whiteSpace: "nowrap" }}>[{(label).toString()}]</span>
                    <div style={{flex: 1, display: "flex", alignItems: "center"}} onDoubleClick={() => onStartEdit(TargetComponentType.TITLE)}>
                        {label !== nodeData.name && <span>{nodeData.name || label}</span>}
                    </div>
                </div>)
            }
        </>
    )
}

export default NodeHeaderTitle;