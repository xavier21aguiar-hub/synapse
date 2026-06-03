import { useDashboard } from "../context/DashboardContext"
import SynapseCore from "../components/dashboard/synapse/SynapseCore"

export default function Tasks(){
    const {priorities,togglePriority,taskSummary,mood} = useDashboard()

    const taskInsight = taskSummary.highPriorityPending > 0
    ? `Tienes ${taskSummary.highPriorityPending} tareas prioritarias pendientes.`
    : "No hay tareas críticas pendientes."

    return(
        <div className="
        min-h-screen
        bg-slate-950
        text-white
        p-10">
    
            <div className="
            max-w-7xl
            mx-auto">
    
                <h1 className="
                text-5xl
                font-bold">
                    Tareas
                </h1>
    
                <p className="
                mt-3
                text-white/50">
                    Hoy completaste
                    {" "}
                    <span className="
                    text-cyan-300">
                        {taskSummary.completedToday}
                    </span>
                    {" "} de {" "}
                    <span className="
                    text-cyan-300">
                        {taskSummary.totalDay}
                    </span>
                    {" "}
                    tareas 
                </p>
    
            </div>
    
            {/* Layout */}
            <div className="
            mt-16
            flex
            flex-col
            items-center">
    
                {/* Synapse Insight */}
                {/* Burbuja */}
                <div className="
                w-[300px]
                rounded-3xl
                border
                border-cyan-400/15
                bg-white/5
                backdrop-blur-xl
                mb-2
                ml-96
                p-5
                text-center">
    
                    {/* Pico de Burbuja */}
                    <div className="
                    absolute
                    left-3
                    bottom-[-10px]
                    -translate-x-3
                    w-4
                    h-4
                    rotate-90
                    bg-slate-900
                    border-r
                    border-b
                    border-cyan-400/15"/>
    
                    {/* Conversacion */}
                    <p className="
                    text-white/80">
                        {taskInsight}
                    </p>
                </div>
    
                {/* Avatar */}
                <div className="
                scale-[0.9]
                -mt-48">
                    <SynapseCore compact/>
                </div>

                {/* Summary Cards */}
                <div className="
                mt-8
                grid
                grid-cols-3
                gap-6">
                    Hoy
                    {taskSummary.completedToday}
                    /
                    {taskSummary.totalToday}
                </div>
                <div className="
                mt-8
                grid
                grid-cols-3
                gap-6">
                    Hoy
                    Pendientes
                    {taskSummary.pending}
                </div>
                <div className="
                mt-8
                grid
                grid-cols-3
                gap-6">
                    Hoy
                    Alta prioridad
                    {taskSummary.highPriorityPending}
                </div>
            </div>
    
            {/* Tareas */}
            <div className="
            rounded-3xl
            border
            border-cyan-400/15
            bg-white/5
            backdrop-blur-xl
            p-8
            ml-48">
    
                <h2 className="
                text-2xl
                font-semibold">
                    Tareas de hoy
                </h2>
            </div>
            
        </div>
    )
}