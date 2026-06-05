import { createContext,useContext } from "react"
import { useDashboard } from "./DashboardContext"
import { Calculator } from "lucide-react"

const BrainContext =createContext()

export function BrainProvider({
    children
}){
    const{
        taskSummary,
        habitSummary,
        financeSummary,
        energy,
        mood,
        events,
        reminders
    } = useDashboard()

    const brainContext = {
        tasks:{
            pending: taskSummary.pending,
            highPriority: taskSummary.highPriorityPending
        },
        habits:{
            completionRate: habitSummary.completionRate
        },
        finance:{
            balance: financeSummary.balance
        },
        mood,
        energy,
        events: {total: events.length},
        reminders: {total: reminders.length},
        sleep: {
            hours: null,
            quality: null,
            interruptions: null
        },
        activity: {
            steps: null,
            workoutMinutes: null,
            calories: null
        }
    }

    const productivity = taskSummary.totalToday > 0
    ? Math.round((
        taskSummary.completedToday /
        taskSummary.totalToday
    ) * 100)
    : 50

    const discipline = habitSummary.completionRate

    const financialHealth = financeSummary.balance >= 0
    ? 80
    : 40

    const stress = Math.min(
        100,
        taskSummary.highPriorityPending * 15 +
        events.length * 10 +
        reminders.length * 5
    )

    const wellbeing = Math.round(
        (energy + habitSummary.completionRate) / 2
    )

    const focus = Math.max(
        0,
        100 - stress
    )

    //const recovery = brainContext.sleep.hours
    // calcular ?
    // : energy
    const recovery = energy

    const consistency = habitSummary.completionRate

    const workload = Math.min(
        100,
        taskSummary.pending * 10 +
        events.length * 8 +
        reminders.length * 4
    )

    const momentum = Math.round(
        (
            productivity + discipline
        ) / 2
    )

    const brainAnalysis = {
        productivity,
        discipline,
        wellbeing,
        stress,
        focus,
        financialHealth,
        recovery,
        consistency,
        workload,
        momentum
    }

    let brainInsight = ""
    if(
        brainAnalysis.stress > 80
    ){
        brainInsight = 
        "Tu carga actual es elevada. Prioriza las tareas críticas antes de asumir nuevos compromisos."
    }else if(
        brainAnalysis.recovery < 40
    ){
        brainInsight = 
        "Tu nivel de recuperación es bajo. Conviene reservar tiempo para descanso antes de enfocarte en trabajo profundo."
    }else if(
        brainAnalysis.workload > 75
    ){
        brainInsight = 
        "Tienes una agenda exigente hoy. Organizar bloques de enfoque puede ayudarte a mantener el ritmo."
    }else if(
        brainAnalysis.momentum > 80
    ){
        brainInsight =
        "Estás manteniendo una excelente consistencia. Es un buen momento para avanzar en objetivos importantes."
    }else if(
        brainAnalysis.wellbeing > 80
    ){
        brainInsight =
        "Tu bienestar general es alto. Aprovecha esta energía para actividades de alto impacto."
    }else{
        brainInsight = 
        "Tu día se encuentra equilibrado. Mantén el enfoque en tus prioridades principales."
    }

    let brainPrediction = ""
    if(
        brainAnalysis.stress > 70
    ){
        brainPrediction = 
        "Si continúas con esta carga durante la tarde podrías experimentar fatiga mental."
    }else if(
        brainAnalysis.momentum > 80
    ){
        brainPrediction =
        "Mantienes una tendencia positiva que favorece completar objetivos importantes hoy."
    }else if(
        brainAnalysis.discipline > 80
    ){
        brainPrediction = 
        "Tu consistencia actual favorece la formación de hábitos sostenibles."
    }else if(
        brainAnalysis.recovery < 50
    ){
        brainPrediction = 
        "Una recuperación limitada podría reducir tu capacidad de concentración hacia el final del día."
    }else{
        brainPrediction = 
        "No se detectan riesgos importantes en tu tendencia actual."
    }

    const value ={
        brainContext,
        brainAnalysis,
        brainInsight,
        brainPrediction
    }

    return(
        <BrainContext.Provider
        value={value}>
            {children}
        </BrainContext.Provider>
    )
}

export function useBrain(){
    return useContext(BrainContext)
}