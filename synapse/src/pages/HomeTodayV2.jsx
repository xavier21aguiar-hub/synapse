import SynapseCore from "../components/dashboard/synapse/SynapseCore"
import { useDashboard } from "../context/DashboardContext"
import { useMemo } from "react"
import { Brain,Sparkles,Wallet,Target,Dumbbell,Battery,BrainCircuit,Focus,Heart } from "lucide-react"
import StatRing from "../components/home/StatRing"
import { useNavigate } from "react-router-dom"

export default function HomeTodayV2(){
    
    const navigate = useNavigate()

    const{
            mood,
            energy,
            insight,
            prediction,
            internalState
        }=useDashboard()
    
        const now = new Date()
        const hour = now.getHours()
    
        let greeting = "Buenas noches 🌙"
    
        if( hour >= 6 && hour < 12 ){
            greeting = "Buenos días ☀️"
        }
    
        if( hour >= 12 && hour < 19 ){
            greeting = "Buenas tardes 🌤️"
        }
    
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

    const orbitCards=[
        {
            title: "Synapse piensa",
            icon: <Brain size={40} strokeWidth={2.3} />,
            content:"Hoy detecté buena estabilidad emocional.",
            x:0,
            y:-360
        },
        {
            title:"Predicción",
            icon: <Sparkles size={40} strokeWidth={2.3} />,
            content:"Tu energía seguirá estable.",
            x:350,
            y:-116
        },
        {
            title:"Hábitos",
            icon: <Dumbbell size={40} strokeWidth={2.3} />,
            content:"2 hábitos completados hoy.",
            x:-290,
            y:220
        },
        {
            title:"Objetivo",
            icon: <Target size={40} strokeWidth={2.3} />,
            content:"Mantener enfoque profundo.",
            x:-340,
            y:-130
        },
        {
            title:"Finanzas",
            icon: <Wallet size={40} strokeWidth={2.3} />,
            route:"/finance",
            content:"Gasto controlado hoy.",
            x:300,
            y:220
        }
    ]

    const miniStats = [
        {
            label:"Energía",
            value:energy,
            color:"#34D399",
            icon:<Battery size={14}/>
        },
        {
            label:"Estrés",
            value:28,
            color:"#FB923C",
            icon:<BrainCircuit size={14}/>
        },
        {
            label:"Enfoque",
            value:91,
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
        h-screen
        overflow-hidden
        bg-slate-950
        text-white">

            {/* Left Panel */}
            <div className="
            absolute
            left-24
            top-24
            z-20
            w-[320px]">
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
                                text-white/60
                                text-sm">
                                    Hoy quiero ayudarte a
                                </p>

                                <h2 className="
                                mt-2
                                text-2xl
                                font-semibold
                                leading-normal">
                                    mantener estabilidad emocional
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

                <div className={`
                relative
                w-[850px]
                h-[850px]
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

            </div>

        </div>
    )
}