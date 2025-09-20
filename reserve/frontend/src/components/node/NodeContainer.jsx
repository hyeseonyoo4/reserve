import React from "react";
import { Handle, Position } from "@xyflow/react";
import {typeColors} from "../../utils/types.js";

export function NodeContainer({ children }) {
    return (
        // 핸들 잘림 방지
        <div style={{ position: "relative", overflow: "visible" }}>
            {children}
        </div>
    );
}
