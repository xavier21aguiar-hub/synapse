import { useEffect, useState } from "react"
import { useDashboard } from "../../../context/DashboardContext"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function SynapseThoughts(){

    const {mood, energy, habits} = useDashboard()

    const theme= emotionThemes[mood] || emotionThemes.good

    const thoughts=[]

    if(energy < 40){
        thoughts.push("Tu energía bajó un poco...")
    }

    if(mood === "fatigued"){
        thoughts.push("Detecté carga mental alta")
    }

    if(habits.study > habits.sleep){
        thoughts.push("Has estudiado bastante hoy")
    }

    if(habits.sleep > 2){
        thoughts.push("Tu descanso mejoró")
    }

    if(thoughts.length===0){
        thoughts.push("Todo se ve estable ✨")
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
        ${thoughtTheme.bg}
        border
        ${thoughtTheme.border}
        backdrop-blur-xl
        text-sm
        ${thoughtTheme.text}
        shadow-lg
        transition-all
        duration-1000`}>
            ✨ {thoughts[current]}
        </div>
    )
}