import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import ScenarioList from "./components/ScenarioList.jsx"
import EditorPage from "./components/EditorPage"
import "./index.css"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <ScenarioList /> },
            { path: "editor/:scenarioId", element: <EditorPage /> },
        ],
    },
])

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
