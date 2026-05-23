import { useDashboard } from "../../context/DashboardContext"

export default function SynapseAvatar(){
    const {
        mood, 
        energy,
        habits 
    } = useDashboard()

    let face= "🧠"
    let message= "Analizando..."

    if(
        energy < 40
    ){
        face= "🥱"
        message= "Parece que necesitas descansar"
    }
    else if(
        mood==="fatigued"
    ){
        face= "😵"
        message= "Detecté carga mental alta"
    }
    else if(
        habits.study > habits.sleep
    ){
        face= "📚"
        message= "Has estudiado bastante"
    }
    else if(
        energy>80
    ){
        face="⚡😄"
        message= "Te noto con mucha energía"
    }
    
    return(
    <div className="
    bg-surface
    rounded-3xl
    p-8
    border border-gray-800
    flex
    items-center
    gap-6
    transition-all
    duration-500
    hover:scale-[1.02]">
        
        <div className={`
        text-6xl
        transition-all
        duration-700

        ${energy>80
        ? "animate-bounce scale-110"

        : mood==="fatigued"
        ? "animate-pulse scale-95"

        : habits.study > habits.sleep
        ? "animate-pulse rotate-3"

        : "animate pulse"
        }
        `}>
            {face}
        </div>
        
        <div>
            <h3 className="
            font-semibold
            text-xl">
                Synapse
            </h3>
            
            <div className="
            relative
            mt-3">
                <div className="
                bg-[#20242d]
                rounded-2xl
                px-4
                py-3
                text-sm
                opacity-80
                max-w-xs
                relative">
                    💭 {message}
                    
                    <div className="
                    absolute
                    -left-2
                    top-4
                    w-4
                    h-4
                    bg-[#20242d]
                    rotate-45">
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}