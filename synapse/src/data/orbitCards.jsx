import {
    Brain,
    Sparkles,
    Dumbbell,
    Target,
    Wallet
} from "lucide-react"

export function buildOrbitCards({
    brainInsight,
    brainPrediction,
    habitSummary,
    taskSummary,
    financeSummary
}){

    return [
        {
            title:"Synapse piensa",
            icon:<Brain size={40} strokeWidth={2.3}/>,
            content:brainInsight,
            x:0,
            y:-360
        },
        {
            title:"Predicción",
            icon:<Sparkles size={40} strokeWidth={2.3}/>,
            content:
            brainPrediction ||
            "No hay suficientes datos todavía",
            x:350,
            y:-116
        },
        {
            title:"Hábitos",
            icon:<Dumbbell size={40} strokeWidth={2.3}/>,
            route:"/habits",
            content:
            `${habitSummary.completedToday}
            de
            ${habitSummary.totalToday}
            hábitos completados`,
            x:-290,
            y:220
        },
        {
            title:"Tareas",
            icon:<Target size={40} strokeWidth={2.3}/>,
            route:"/tasks",
            content:
            `${taskSummary.completedToday}
            de
            ${taskSummary.totalToday}
            tareas completadas`,
            x:-340,
            y:-130
        },
        {
            title:"Finanzas",
            icon:<Wallet size={40} strokeWidth={2.3}/>,
            route:"/finance",
            content:
            `Balance actual:
            $${financeSummary.balance}`,
            x:300,
            y:220
        }
    ]
}