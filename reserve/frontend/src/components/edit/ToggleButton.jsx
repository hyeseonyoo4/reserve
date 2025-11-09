const ToggleButton = ({ isOn, onToggle }) => {
    const containerStyle = {
        width: "48px",
        height: "24px",
        borderRadius: "12px",
        background: isOn ? "#3B82F6" : "#D1D5DB", // 푸른 계열(ON), 회색 계열(OFF)
        position: "relative",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        transition: "background 0.3s ease",
    };

    const knobStyle = {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "white",
        position: "absolute",
        top: "2px",
        left: isOn ? "24px" : "2px", // 상태에 따라 위치 변경
        transition: "left 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // 둥근 그림자
    };

    return (
        <div
            style={containerStyle}
            onClick={(e) => {
                e.stopPropagation();
                onToggle(!isOn); // 상태 변경
            }}
        >
            <div style={knobStyle} />
        </div>
    );
};

export default ToggleButton;