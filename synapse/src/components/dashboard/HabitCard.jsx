import { useDashboard } from "../../context/DashboardContext"

export default function HabitCard(){
    const{habits} = useDashboard ()

    console.log("HabitCard:", habits)
    if(!habits){
        
        return(
        <div className="bg-surface
        rounded-3xl
        p-6
        border border-gray-800">
            Cargando hábitos...
        </div>
        )
    }

    return(
        <div className="
        bg-surface
        rounded-3xl
        p-6
        border border-gray-800">
            <p className="mb-4 text-primary">
                🧠 Hábitos detectados
            </p>

            <div className="space-y-3">
                <p>
                    😴 Descanso:
                    {habits.sleep} sesiones
                </p>
                <p>
                    📚 Estudio:
                    {habits.study} sesiones
                </p>
                <p>
                    💼 Trabajo:
                    {habits.work} sesiones
                </p>
            </div>
        </div>
    )
}