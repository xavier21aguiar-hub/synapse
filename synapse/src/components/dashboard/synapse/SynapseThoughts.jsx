import { useEffect, useState, useMemo } from "react"
import { useDashboard } from "../../../context/DashboardContext"
import { emotionThemes } from "../../../utils/emotionTheme"
import { analyzeMemory } from "../../../utils/memoryEngine"
import { analyzeConversation, rememberConversation } from "../../../utils/conversationMemory"
import { evolvePersonality } from "../../../utils/personalityEngine"
import { generateGoal } from "../../../utils/goalEngine"

export default function SynapseThoughts(){

    const {mood, energy, habits, moodHistory=[],conversationHistory=[], internalState} = useDashboard()

    const theme= emotionThemes[mood] || emotionThemes.good

    const [current,setCurrent]= useState(0)

    const thoughts= useMemo(() => {
        const list=[]

        if(
            mood==="fatigued"
        ){
            list.push(
                "Detecté carga mental alta"
            )
        }

        if(
            mood==="stressed"
        ){
            list.push(
                "Percibo algo de tensión"
            )
        }

        if(
            mood==="calm"
        ){
            list.push(
                "Tu ritmo se siente estable"
            )
        }

        if(
            mood==="energized"
        ){
            list.push(
                "Tu energía está en un gran nivel"
            )
        }

        const stressedCount=
        moodHistory.filter(
            m=>
                m==="stressed"
        ).length

        if(
            stressedCount>=3
        ){
            list.push(
                "He detectado tensión continua"
            )
        }

        const fatigueCount=
        moodHistory.filter(
            m=>
                m==="fatigued"
        ).length

        if(
            fatigueCount>=3
        ){
            list.push(
                "Tu energía lleva tiempo baja"
            )
        }

        const memoryInsight=
        analyzeMemory(
            moodHistory
        )

        if(
            memoryInsight
        ){
            list.push(
                memoryInsight
            )
        }

        if(
            list.length===0
        ){
            list.push(
                "Todo se ve estable ✨"
            )
        }

        const personality=
        evolvePersonality(
            moodHistory
        )
        if(
            personality
        ){
            list.push(
                personality.message
            )
        }

        const goal=
        generateGoal(
            moodHistory,internalState
        )
        if(
            goal
        ){
            list.push(
                goal.message
            )
        }

        const insight=
        analyzeConversation(
            conversationHistory
        )
        if(
            insight
        ){
            list.push(
                insight
            )
        }

        return list
    },[mood,moodHistory,conversationHistory,internalState])

    useEffect(() => {
        if(
            thoughts.length<=1
        )
        return

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
    },[thoughts])

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