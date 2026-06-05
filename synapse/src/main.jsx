import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

import "./index.css"

import { DashboardProvider } from "./context/DashboardContext"
import { BrainProvider } from "./context/BrainContext"

ReactDOM.createRoot( document.getElementById("root")
).render(

<React.StrictMode>

    <DashboardProvider>

      <BrainProvider>

        <App/>

      </BrainProvider>

    </DashboardProvider>

</React.StrictMode>

)
