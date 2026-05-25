import { useEffect, useState } from "react"
import { useDashboard } from "../../../context/DashboardContext"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function SynapseThoughts(){

    const {mood, energy, habits} = useDashboard()

    const theme= emotionThemes[mood] || emotionThemes.good

    const thoughts=[]

    if(
        mood==="fatigued"
    ){
        thoughts.push("Detecté carga mental alta")
    }
    
    if(
        mood==="stressed"
    ){
        thoughts.push("Percibo algo de tensión")
    }
    
    if(
        mood==="calm"
    ){
        thoughts.push("Tu ritmo se siente estable")
    }
    
    if(
        mood==="energized"
    ){
        thoughts.push("Tu energía está en un gran nivel")
    }

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => 
            (prev+1)
            %
            thoughts.length
            )
        },6000)

        return() => {
            clearInterval(interval)
        }
    },[thoughts.length])

    return(
        <div className={`
        absolute
        -top-10
        px-5
        py-2
        rounded-full
        ${theme.thought.bg}
        border
        ${theme.thought.border}
        backdrop-blur-xl
        text-sm
        ${theme.thought.text}
        shadow-lg
        transition-all
        duration-1000`}>
            ✨ {thoughts[current]}
        </div>
    )
}