import React from "react"
import { useEffect } from "react"
import { X } from "lucide-react"

export function LayerPopup({
                               isOpen,
                               onClose,
                               title,
                               children,
                               onOk,
                               onCancel,
                               customButtons = [],
                               showDefaultButtons = true,
                           }) {
    // ESC 키로 모달 닫기
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            // 모달이 열릴 때 body 스크롤 방지
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleOk = () => {
        onOk?.()
        onClose()
    }

    const handleCancel = () => {
        onCancel?.()
        onClose()
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
            }}
            onClick={handleBackdropClick}
        >
            <div
                className="bg-card rounded-lg border"
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "28rem",
                    margin: "0 1rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    animation: "fadeIn 0.2s ease-out",
                }}
            >
                {/* Header */}
                <div
                    className="border-b px-4"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                    <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={onClose}
                        style={{
                            height: "2rem",
                            width: "2rem",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X style={{ height: "1rem", width: "1rem" }} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 text-card-foreground">{children}</div>

                {/* Footer */}
                {(showDefaultButtons || customButtons.length > 0) && (
                    <div
                        className="border-t p-4"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "0.5rem",
                            backgroundColor: "rgba(var(--muted), 0.2)",
                        }}
                    >
                        {/* Custom Buttons */}
                        {customButtons.map((button, index) => (
                            <button key={index} className={`btn btn-${button.variant || "outline"}`} onClick={button.onClick}>
                                {button.label}
                            </button>
                        ))}

                        {/* Default Buttons */}
                        {showDefaultButtons && (
                            <>
                                <button className="btn btn-outline" onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleOk}>
                                    OK
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
