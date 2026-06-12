import SynapseCore from "../components/dashboard/synapse/SynapseCore"
import { useDashboard } from "../context/DashboardContext"
import { useMemo } from "react"
import { Brain,Sparkles,Wallet,Target,Dumbbell,Battery,BrainCircuit,Focus,Heart} from "lucide-react"
import StatRing from "../components/home/StatRing"
import { useNavigate } from "react-router-dom"
import { useBrain } from "../context/BrainContext"
import { getGreeting } from "../utils/getGreeting"
import MobileCard from "../components/home/MobileCard"
import NotificationCenter from "../components/home/NotificationCenter"
import { buildOrbitCards } from "../data/orbitCards.jsx"

export default function HomeTodayV2(){

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1280
    
    const navigate = useNavigate()

    const orbitSize = isTablet
    ? "w-[650px] h-[650px]"
    : "w-[850px] h-[850px]"

    const{
        mood,
        energy,
        taskSummary,
        habitSummary,
        financeSummary
    }=useDashboard()

    const {
        brainAnalysis,
        brainInsight,
        brainPrediction
    } = useBrain()

    const greeting = getGreeting()

    const now = new Date()
    const hour = now.getHours()
    
    // Fecha actual en español
    const fechaFormato = useMemo(() => {
        return now.toLocaleDateString("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }, [])
    
    // Hora formateada
    const horaFormato = useMemo(() => {
        return now.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }, [])

    const orbitCards = buildOrbitCards({
        brainInsight,
        brainPrediction,
        habitSummary,
        taskSummary,
        financeSummary
    })

    const miniStats = [
        {
            label:"Energía",
            value:energy,
            color:"#34D399",
            icon:<Battery size={14}/>
        },
        {
            label:"Estrés",
            value: brainAnalysis.stress,
            color:"#FB923C",
            icon:<BrainCircuit size={14}/>
        },
        {
            label:"Enfoque",
            value: brainAnalysis.focus,
            color:"#38BDF8",
            icon:<Focus size={14}/>
        }
    ]

    const moodUI={
        calm:{
            border:"border-cyan-400/10",
            glow:"bg-cyan-400/10",
            card:"border-cyan-300/20"
        },

        energized:{
            border:"border-blue-400/20",
            glow:"bg-blue-400/15",
            card:"border-blue-300/30"
        },

        stressed:{
            border:"border-orange-400/20",
            glow:"bg-orange-400/15",
            card:"border-orange-300/30"
        },

        fatigued:{
            border:"border-purple-400/20",
            glow:"bg-purple-400/15",
            card:"border-purple-300/30"
        }
    }

    const currentUI=
    moodUI[mood]
    ||
    moodUI.calm

    return(
        <div className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white">

            <NotificationCenter
            isMobile={isMobile}
            />

            {/* Left Panel */}
            <div className={`
            z-20
            ${isMobile
                ? `relative
                w-full
                px-6
                pt-24`
                : `absolute
                left-24
                top-24
                w-[320px]`
            }`}>
                <div className="
                flex
                flex-col
                justify-between
                h-[80vh]">

                    {/* TOP INFO */}
                    <div>
                        <h1 className="
                        text-5xl
                        font-bold
                        leading-tight">
                            {greeting}
                        </h1>

                        <p className="
                        mt-2
                        text-cyan-300
                        text-xl
                        capitalize">
                            {fechaFormato}
                        </p>

                        <p className="
                        mt-2
                        text-white/50
                        text-lg">
                            {horaFormato}
                        </p>
                    </div>

                    {/* CONTEXT CARD */}
                    <div className="
                    w-[280px]
                    mt-24
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-5
                    shadow-[0_0_40px_rgba(255,255,255,0.04)]">

                        <div className="
                        flex
                        items-start
                        gap-4">

                            <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-cyan-400/10
                            flex
                            items-center
                            justify-center
                            text-xl">
                                <Heart size={24} strokeWidth={2.5}/>
                            </div>

                            <div>
                                <p className="
                                mt-2
                                text-xl
                                font-semibold
                                leading-normal">
                                    Synapse ya analizó tu día
                                </p>

                                <h2 className="
                                mt-4
                                text-sm
                                leading-relaxed
                                text-white/80">
                                    {brainInsight}
                                </h2>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orbital System */}
            <div className="
            absolute
            inset-0
            flex
            items-center
            justify-center">

                {
                !isMobile && (

                <div className={`
                relative
                ${orbitSize}
                rounded-full
                border
                ${currentUI.card}`}>

                    {/* Orbita exterior */}
                    <div className={`
                    absolute
                    inset-0
                    rounded-full
                    border
                    ${currentUI.border}
                    animate-[pulse_8s_ease-in-out_infinite]`}/>

                    {/* Orbita interna */}
                    <div className="
                    absolute
                    top-1/2
                    left-1/2
                    w-[600px]
                    h-[600px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    border-purple-400/10
                    animate-[pulse_10s_ease-in-out_infinite]"/>

                    {/* Nucleo */}
                    <div className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2">

                        <div className={`
                        absolute
                        top-1/2
                        left-1/2
                        w-[700px]
                        h-[700px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        ${currentUI.glow}
                        blur-[120px]
                        animate-[pulse_5s_ease-in-out_infinite]`}/>

                        <div className="
                        absolute
                        top-1/2
                        left-1/2
                        w-[500px]
                        h-[500px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-purple-500/5
                        blur-3xl"/>

                        <div className="
                        w-[580px]
                        h-[580px]
                        animate-[float_6s_ease-in-out_infinite]
                        flex
                        items-center
                        justify-center">

                            <SynapseCore compact/>

                            {/* Particulas */}
                            <div className="
                            absolute
                            top-1/2
                            left-1/2
                            w-[620px]
                            h-[620px]
                            -translate-x-1/2
                            -translate-y-1/2
                            animate-spin
                            [animation-duration:25s]">

                                <div className="
                                absolute
                                top-0
                                left-1/2
                                w-5
                                h-5
                                rounded-full
                                bg-cyan-300
                                shadow-[0_0_20px_rgba(103,232,249,0.9)]"/>
                            </div>

                            <div className="
                            absolute
                            top-1/2
                            left-1/2
                            w-[520px]
                            h-[520px]
                            -translate-x-1/2
                            -translate-y-1/2
                            animate-spin
                            [animation-duration:18s]
                            [animation-direction:reverse]
                            ">
                                <div className="
                                absolute
                                bottom-0
                                right-24
                                w-3
                                h-3
                                rounded-full
                                bg-cyan-200
                                blur-[1px]
                                shadow-[0_0_18px_rgba(165,243,252,0.9)]
                                "/>
                            </div>

                        </div>

                    </div>

                    {/* ORBIT CARD */}
                    {
                        orbitCards.map((card,index)=>(
                            <div
                            key={index}
                            onClick={()=>
                                card.route && navigate(card.route)
                            }
                            className="
                            absolute
                            top-1/2
                            left-1/2
                            "
                            style={{
                                transform:`
                                translate(
                                -50%,
                                -50%)
                                translate(
                                ${card.x}px,
                                ${card.y}px)`
                            }}>
                                <div className="
                                w-[210px]
                                h-[210px]
                                rounded-full
                                border
                                border-cyan-400/20
                                bg-white/5
                                backdrop-blur-xl
                                flex
                                flex-col
                                items-center
                                justify-center
                                text-center
                                shadow-[0_0_40px_rgba(34,211,238,0.15)]
                                transition-all
                                duration-500
                                hover:scale-[1.03]
                                hover:border-cyan-300/40
                                hover:bg-white/10
                                hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]">

                                    <div className="
                                    text-cyan-300
                                    text-5xl">
                                        {card.icon}
                                    </div>

                                    <h2 className="
                                    mt-4
                                    text-xl
                                    font-semibold">
                                        {card.title}
                                    </h2>

                                    <p className="
                                    mt-3
                                    px-6
                                    text-sm
                                    opacity-70
                                    leading-relaxed">
                                        {card.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    }

                    {/* MINI STATS */}
                    {
                        miniStats.map((stat,index)=>{

                            const positions=[
                                {x:-150,y:300},
                                {x:-34,y:330},
                                {x:81,y:300}
                            ]

                            return(
                                <div
                                key={index}
                                className="
                                absolute
                                top-1/2
                                left-1/2
                                z-30"
                                style={{
                                    transform:`
                                    translate(
                                    ${positions[index].x}px,
                                    ${positions[index].y}px
                                    )`
                                }}>

                                    <StatRing
                                    value={stat.value}
                                    label={stat.label}
                                    color={stat.color}
                                    icon={stat.icon}/>
                                </div>
                            )
                        })
                    }

                </div>
                )
                }

                {
                    isMobile && (
                        <div className="
                        mt-10
                        grid
                        grid-cols-1
                        gap-4">
                            {
                                orbitCards.map(
                                    (card,index) => (
                                        <MobileCard
                                        key={index}
                                        card={card}/>
                                    )
                                )
                            }
                            {
                                isMobile && (
                                    <div className="
                                    mt-4
                                    grid
                                    grid-cols-2
                                    gap-3">
                                        {
                                            miniStats.map(
                                                (stat,index) => (
                                                    <div
                                                    key={index}
                                                    className="
                                                    rounded-2xl
                                                    bg-white/5
                                                    p-4">
                                                        <p className="
                                                        text-xs
                                                        text-white/50">
                                                            {stat.label}
                                                        </p>
                                                        <p className="
                                                        mt-1
                                                        text-xl
                                                        font-semibold">
                                                            {stat.value}
                                                        </p>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }

            </div>

        </div>
    )
}