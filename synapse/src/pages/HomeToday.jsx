import SynapseCore from "../components/dashboard/synapse/SynapseCore"
import { useDashboard } from "../context/DashboardContext"
import OrbitCard from "../components/home/OrbitCard"
import StatRing from "../components/home/StatRing"
import { Brain,Sparkles,Wallet,Target,Dumbbell,Battery,BrainCircuit,Focus,Heart } from "lucide-react"
import { useMemo, useRef, useEffect, useState } from "react"

export default function HomeToday(){
    
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

    // Posiciones actualizadas
    const orbitCards=[
        {
            title:"Synapse piensa",
            icon: <Brain size={28} strokeWidth={2.3} />,
            content: insight,
            angle:-90 // Arriba al centro
        },
        {
            title:"Predicción",
            icon: <Sparkles size={28} strokeWidth={2.3} />,
            content: prediction,
            angle:-30 // Arriba a la derecha
        },
        {
            title:"Finanzas",
            icon: <Wallet size={28} strokeWidth={2.3} />,
            content:"Disponible: $2400",
            angle:30 // Abajo a la derecha
        },
        {
            title:"Objetivo",
            icon: <Target size={28} strokeWidth={2.3} />,
            content: "Mantener energía alta",
            angle:-150 // Arriba a la izquierda
        },
        {
            title:"Hábitos",
            icon: <Dumbbell size={28} strokeWidth={2.3} />,
            content:"2/5 completados",
            angle:150 // Abajo a la izquierda
        },
    ]

    return(
    <div
        className="
        min-h-screen
        bg-slate-950
        text-white
        overflow-hidden"
    >
        {/* Usamos Grid para lograr un centrado perfecto del sistema orbital */}
        <div
            className="
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[260px_1fr_260px]
            h-screen"
            style={{ 
                maxWidth: "100%",
                padding: "clamp(1rem, 3vw, 2rem)"
            }}
        >

            {/* ── Columna izquierda: saludo + fecha + tarjeta objetivo ── */}
            <div className="flex flex-col justify-between pt-4 pb-8 lg:pt-8 lg:pb-12 z-50">
                <div>
                    <h1
                        className="
                        font-bold
                        leading-tight"
                        style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
                    >
                        {greeting}
                    </h1>

                    {/* Fecha y hora */}
                    <div className="mt-3 space-y-0.5">
                        <p
                            className="
                            font-semibold
                            text-cyan-300/80
                            capitalize"
                            style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
                        >
                            {fechaFormato}
                        </p>
                        <p
                            className="
                            text-white/40
                            text-sm"
                        >
                            {horaFormato}
                        </p>
                    </div>
                </div>

                {/* Tarjeta inferior izquierda: Objetivo del día */}
                <div className="
                    p-5
                    rounded-3xl
                    bg-slate-900/40
                    border
                    border-purple-500/20
                    backdrop-blur-xl
                    flex
                    items-center
                    gap-4
                    mt-8
                    hover:border-purple-500/40
                    transition-colors
                    cursor-pointer
                ">
                    <div className="
                        w-14 h-14
                        rounded-full
                        border border-purple-500/30
                        flex items-center justify-center
                        bg-purple-500/10
                        shadow-[0_0_15px_rgba(168,85,247,0.15)]
                        flex-shrink-0
                        text-purple-400
                    ">
                        <Heart size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-purple-300/80 text-sm mb-0.5">Hoy quiero ayudarte a</p>
                        <h3 className="text-lg font-bold text-white mb-0.5">mantener tu energía</h3>
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                            y enfocarte en lo importante. <span className="text-purple-400">&gt;</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Columna central: sistema orbital ── */}
            <div
                className="
                relative
                flex
                justify-center
                items-center
                w-full
                h-full
                min-h-[400px]"
            >
                {/* Contenedor central */}
                <div
                    className="
                    relative
                    flex
                    justify-center
                    items-center
                    "
                    style={{
                        width: "1500px",
                        height: "1500px",
                    }}
                >
                    {/* Órbita exterior */}
                    <div className="
                        absolute
                        w-[980px]
                        h-[980px]
                        rounded-full
                        border
                        border-cyan-400/20"
                    />

                    {/* Órbita media */}
                    <div className="
                        absolute
                        w-[760px]
                        h-[760px]
                        rounded-full
                        border
                        border-purple-400/15"
                    />

                    {/* Glow interior */}
                    <div className="
                        absolute
                        w-[480px]
                        h-[480px]
                        rounded-full
                        bg-cyan-500/5
                        blur-3xl"
                    />

                    {/* Glow exterior */}
                    <div className="
                        absolute
                        w-[680px]
                        h-[680px]
                        rounded-full
                        bg-purple-500/4
                        blur-3xl"
                    />

                    {/* ORBIT CARDS */}
                    {
                    orbitCards.map(
                        (card,index)=>{
                            const radius = 420 // Radio fijo para las cards sobre la órbita exterior
                            const angleRad = (card.angle * Math.PI) / 180

                            const x = Math.cos(angleRad) * radius
                            const y = Math.sin(angleRad) * radius

                            return(
                            <div
                            key={index}
                            className="absolute z-40"
                            style={{
                                transform:`translate(${x}px,${y}px) translate(-50%,-50%)`
                            }}>
                                <OrbitCard
                                title={card.title}
                                icon={card.icon}>
                                    {card.content}
                                </OrbitCard>
                            </div>
                            )
                        }
                    )
                    }

                    {/* SynapseCore centrado */}
                    <div className="absolute z-20 scale-[1.1]">
                        <SynapseCore compact/>
                    </div>

                    {/* STAT RINGS — Alineados y bien centrados bajo el avatar */}
                    <div className="
                        absolute
                        z-50
                        " 
                        style={{
                            top: "70%" /* Ligeramente más abajo para alinearse mejor con la órbita media inferior */
                        }}
                    >
                        {[
                            {
                                label:"Estrés",
                                value:internalState.stress,
                                icon:<BrainCircuit size={18}/>,
                                color:"#FF8C37",
                                angle:140
                            },
                            {
                                label:"Enfoque",
                                value:internalState.focus,
                                icon:<Focus size={18}/>,
                                color:"#00D1FF",
                                angle:90
                            },
                            {
                                label:"Energía",
                                value:energy,
                                icon:<Battery size={18}/>,
                                color:"#2EE6A6",
                                angle:40
                            }
                        ].map((ring,index)=>{
                            const radius=300

                            const angleRad=
                            (ring.angle*Math.PI)/180
                            
                            const x=
                            Math.cos(angleRad)
                            *
                            radius
                            
                            const y=
                            Math.sin(angleRad)
                            *
                            radius
                            
                            return(
                            <div
                            key={index}
                            className="
                            absolute
                            z-50"
                            style={{
                                transform:
                                `
                                translate(
                                ${x}px,
                                ${y}px
                                )
                                translate(
                                -50%,
                                -50%
                                )
                            `}}>
                                    
                                    <StatRing
                                    label={ring.label}
                                    value={ring.value}
                                    icon={ring.icon}
                                    color={ring.color}
                                    />
                                    
                            </div>
                            )
                        })}
                    </div>

                </div>
            </div>

            {/* ── Columna derecha: Espacio reservado para balance visual y futuro contenido ── */}
            <div className="hidden lg:block z-50">
                {/* Esto asegura que la columna central quede matemáticamente en el medio de la pantalla */}
            </div>

        </div>
    </div>
)
}