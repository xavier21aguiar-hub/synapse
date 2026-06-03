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
                        {taskSummary.totalToday}
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
                relative
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
                -mt-20
                grid
                grid-cols-3
                gap-6">

                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6
                    text-center">

                        <p className="text-white/50">
                            Hoy
                        </p>

                        <h3 className="
                        mt-2
                        text-2xl
                        font-bold">
                            {taskSummary.completedToday}
                            /
                            {taskSummary.totalToday}
                        </h3>
                    </div>

                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6
                    text-center">

                        <p className="text-white/50">
                            Pendientes
                        </p>

                        <h3 className="
                        mt-2
                        text-2xl
                        font-bold">
                            {taskSummary.pending}
                        </h3>
                    </div>

                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6
                    text-center">

                        <p className="text-white/50">
                            Alta prioridad
                        </p>

                        <h3 className="
                        mt-2
                        text-2xl
                        font-bold">
                            {taskSummary.highPriorityPending}
                        </h3>
                    </div>
                </div>
            </div>
    
            {/* Tareas */}
            <div className="
            mt-16
            max-w-4xl
            mx-auto
            rounded-3xl
            border
            border-cyan-400/15
            bg-white/5
            backdrop-blur-xl
            p-8">
    
                <h2 className="
                text-2xl
                font-semibold">
                    Tareas de hoy
                </h2>

                <div className="
                mt-8
                space-y-4">
                    {
                        priorities.map(task => (
                            <div
                            key={task.id}
                            className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-cyan-400/10
                            bg-slate-900/40
                            p-5">
                                <div>
                                    <p className="
                                    text-lg
                                    font-medium">
                                        {
                                            task.priority === "high"
                                            ? "🔴"

                                            : task.priority === "medium"
                                            ? "🟡"

                                            : "🟢"
                                        }
                                        {" "}
                                        {task.text}
                                    </p>

                                    <p className="
                                    mt-1
                                    text-sm
                                    text-white/50">
                                        {
                                            task.completedToday
                                            ? "Completada"
                                            : "Pendiente"
                                        }
                                    </p>
                                </div>

                                {
                                    task.completed
                                    ? (
                                        <div className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-green-500/10
                                        text-green-400
                                        text-sm">
                                            ✓ Completada
                                        </div>
                                    ) : (
                                        <button
                                        onClick={() => togglePriority(task.id)}
                                        className="
                                        w-10
                                        h-10
                                        rounded-full
                                        border
                                        border-cyan-400/20
                                        hover:bg-cyan-400/20
                                        transition">
                                            ✓
                                        </button>
                                    )
                                }
                            </div>
                        ))
                    }
                    {
                        priorities.length === 0 && (
                            <div className="
                            py-12
                            text-center
                            text-white/50">
                                No tienes tareas registradas
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Agenda */}
            <div className="
            mt-12
            rounded-3xl
            border
            border-cyan-400/15
            bg-white/5
            backdrop-blur-xl
            p-8">
                <h2 className="
                text-2xl
                font-semibold">
                    Agenda de hoy
                </h2>

                <p className="
                mt-4
                text-white/50">
                    Próximamente podrás organizar
                    eventos, reuniones y recordatorios.
                </p>
            </div>
        </div>
    )
}