import { useDashboard } from "../../../context/DashboardContext"
import { useEffect, useState } from "react"
import SynapseParticles from "./SynapseParticles"
import SynapseAudioRing from "./SynapseAudioRing"
import SynapseOrbit from "./SynapseOrbit"
import SynapseThoughts from "./SynapseThoughts"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function synapseCore(){
    const{
        mood, 
        energy,
        habits
    } = useDashboard()

    const [eyeOffset, setEyeOffset] = useState({
        x:0, y:0
    })

    const [blink, setBlink] = useState(false)

    const [breath, setBreath] = useState(0)

    const [autoEye,setAutoEye] = useState({
        x:0, y:0
    })
    
    const [headOffset,setHeadOffset] = useState(0)
    const [eyeTime,setEyeTime] = useState(0)

    const [reaction, setReaction] = useState(false)
    
    const theme= emotionThemes[mood] || emotionThemes.good

    const animation = theme.animation

    useEffect(() => {
        const moveEyes = (e) => {
            const x=
            (e.clientX/window.innerWidth -.5)*8
            const y=
            (e.clientY/window.innerHeight -.5)*8

            setEyeOffset({
                x, y
            })
        }
        window.addEventListener("mousemove", moveEyes)
        return() => {
            window.removeEventListener("mousemove", moveEyes)
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(true)
            setTimeout(() => {
                setBlink(false)
            }, theme.blink.duration)
        }, theme.blink.interval)
        return() => {
            clearInterval(interval)
        }
    },[theme])

    useEffect(() => {
        const id = setInterval(() => {
            setBreath((prev) => prev+0.5)
        },16)
        return() => {
            clearInterval(id)
        }
    },[])

    const scale = 1 + Math.sin(breath/theme.breathing.speed)*theme.breathing.amp

    useEffect(()=>{
        const id = setInterval(() => {
            setEyeTime(
                prev => prev+.05
            )
        },16)
        return() => {
            clearInterval(id)
        }
    },[])

    useEffect(() => {
        let speed=.8
        let range=3
        let head=0
        
        if(
            mood==="energized"
        ){
            speed=2
            range=7
        }
        
        if(
            mood==="stressed"
        ){
            speed=3
            range=5
        }
        
        if(
            mood==="calm"
        ){
            speed=.5
            range=2
        }
        
        if(
            mood==="fatigued"
        ){
            speed=.4
            range=2
            head=8
        }
        
        setAutoEye({
            x:
            Math.sin(eyeTime*speed)*range,
            
            y:
            Math.cos(eyeTime*.5)*1.5
        })
        setHeadOffset(head)
    },[eyeTime,mood])

    useEffect(() => {
        setReaction(true)
        const id = setTimeout(() => {
            setReaction(false)
        }, 6000)
        return () => clearTimeout(id)
    },[mood])

    return(
        <div className="
        relative
        flex
        justify-center
        items-center
        h-72
        overflow-hidden">

            <SynapseParticles/>

            <div className="absolute"
            style={{
                transform:
                "translate(130px,-60px)"
                }}
            >
                <div className={`
                w-12
                h-12
                rounded-full
                ${theme.cells[0]}
                blur-xl
                animate-[float_8s_ease-in-out_infinite]
                `}/>

            </div>
            
            <div className="absolute"
            style={{
                transform:
                "translate(-140px,50px)"
            }}
            >
                <div className={`
                w-8
                h-8
                rounded-full
                ${theme.cells[1]}
                blur-lg
                animate-[float_10s_ease-in-out_infinite_reverse]
                `}/>

            </div>

            <SynapseOrbit/>

            <SynapseAudioRing/>

            <SynapseThoughts/>
            
            <div className={`
                absolute
                w-44
                h-44
                rounded-full
                blur-3xl
                opacity-30
                ${theme.glow}
                `}/>

                <div 
                style={{
                        transform:`
                        translateY(${headOffset}px)
                        scale(${
                            reaction
                            ? scale+.08
                            : scale
                        })`
                    }}
                    className={`
                    relative
                    w-36
                    h-36
                    rounded-full
                    backdrop-blur-xl
                    ring-4
                    ${theme.ring}
                    ${theme.glow}
                    ${reaction ? "brightness-150" : ""}
                    bg-gradient-to-br
                    ${theme.gradient}
                    shadow-2xl
                    ${animation}
                    transition-all
                    duration-1000
                    flex
                    items-center
                    justify-center
                    `}>

                        {
                        theme.eyeType==="slash"
                        
                        ?
                        <div 
                        style={{
                            transform:`
                            translate(
                            ${autoEye.x}px,
                            ${autoEye.y}px
                            )`
                        }}  
                            className={`
                            flex
                            gap-8
                            items-center
                            transition-all
                            duration-200
                            ${blink
                                ? "scale-y-50 translate-y-1"
                                : ""
                            }`}>
                                
                                <div className="
                                w-6
                                h-[3px]
                                bg-orange-100
                                rotate-[25deg]
                                rounded-full
                                shadow-[0_0_10px_rgba(255,220,180,.8)]
                                "/>
                                
                                <div className="
                                w-6
                                h-[3px]
                                bg-orange-100
                                -rotate-[25deg]
                                rounded-full
                                shadow-[0_0_10px_rgba(255,220,180,.8)]
                                "/>
                        </div>

                        :
                        <div 
                        style={{
                            transform:`
                            translate(
                            ${autoEye.x}px,
                            ${autoEye.y}px
                            )`
                        }} 
                        className="
                        flex 
                        gap-8
                        items-center">

                            <div className={`
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                            ${blink
                                ? "scale-y-50 translate-y-2"
                                : " "
                            }
                            `}>
                                <svg
                                className="overflow-visible"
                                width="30"
                                height="14"
                                viewBox="0 0 30 14">
                                    <path 
                                    d= {theme.eyePath}
                                    stroke={theme.eyeColor}
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                    style={{
                                        filter:
                                        `drop-shadow(0 0 6px ${theme.eyeColor})`
                                    }}
                                    />
                                </svg>
                            </div>
                            
                            <div className={`
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                            ${blink
                                ? "scale-y-50 translate-y-2"
                                : " "
                            }
                            `}>
                                <svg
                                className="overflow-visible"
                                width="30"
                                height="14"
                                viewBox="0 0 30 14">
                                    <path 
                                    d= {theme.eyePath}
                                    stroke={theme.eyeColor}
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                    style={{
                                        filter:
                                        `drop-shadow(0 0 6px ${theme.eyeColor})`
                                    }}
                                    />
                                </svg>
                            </div>
                        </div>

                        }

                    </div>
        </div>
    )
}