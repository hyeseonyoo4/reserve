import React, { useState } from 'react';
import { BaseEdge, getBezierPath } from '@xyflow/react';

function EditableEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(data?.label || null);

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleChange = (event) => {
        setLabel(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        // You would typically dispatch an action or call a prop to update the edge data in your state
        // For example: onLabelChange(id, label);
    };

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <foreignObject
                // x={sourceX + (targetX - sourceX) / 2 - 50} // Adjust position as needed
                // y={sourceY + (targetY - sourceY) / 2 - 15} // Adjust position as needed
                x={targetX - 50}
                y={targetY - 30}
                width={100}
                height={30}
                style={{ overflow: 'visible', pointerEvents: 'all' }} // pointerEvents: 'all' is crucial for interactivity
                onDoubleClick={handleDoubleClick}
            >
                {isEditing ? (
                    <input
                        type="text"
                        value={label || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={"분기명을 입력해주세요."}
                        autoFocus
                        style={{ width: '100%', height: '100%', border: 'none', background: 'transparent' }}
                    />
                ) : label ? (
                    <div
                        className="edge-label"
                        style={{ textAlign: 'center' }
                    }>
                        {label}
                    </div>
                ) : (
                    <div
                        className="edge-label"
                        style={{ textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' }
                        }>
                        분기명을 입력해주세요.
                    </div>
                )}
            </foreignObject>
        </>
    );
}

export default EditableEdge;