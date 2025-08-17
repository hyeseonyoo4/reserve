import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function App() {
    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateRows: "56px 1fr" }}>
            <header style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 16px", borderBottom: "1px solid #eee", background: "#fff" }}>
                <Link to="/" style={{ fontWeight: 800, textDecoration: "none", color: "#111" }}>Scenario Studio</Link>
            </header>
            <Outlet />
        </div>
    )
}
