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
    
    const theme= emotionThemes[mood] || emotionThemes.good

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
            }, 150)
        }, 4000)
        return() => {
            clearInterval(interval)
        }
    },[])

    let animation = "animate-pulse"

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
                <div className="
                w-12
                h-12
                rounded-full
                bg-cyan-400/10
                blur-xl
                animate-[float_8s_ease-in-out_infinite]
                "/>

            </div>
            
            <div className="absolute"
            style={{
                transform:
                "translate(-140px,50px)"
            }}
            >
                <div className="
                w-8
                h-8
                rounded-full
                bg-blue-300/20
                blur-lg
                animate-[float_10s_ease-in-out_infinite_reverse]
                "/>

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
                bg-cyan-400`}/>

                <div className={`
                    relative
                    w-36
                    h-36
                    rounded-full
                    backdrop-blur-xl
                    ring-4
                    ${theme.ring}
                    ${theme.glow}
                    bg-gradient-to-br
                    ${theme.gradient}
                    shadow-2xl
                    ${animation}
                    transition-all
                    duration-1000
                    flex
                    items-center
                    justify-center`}>
                        
                        <div className="
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
                                    d= "M2 12 Q15 -2 28 12"
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
                                    d= "M2 12 Q15 -2 28 12"
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

                    </div>
        </div>
    )
}