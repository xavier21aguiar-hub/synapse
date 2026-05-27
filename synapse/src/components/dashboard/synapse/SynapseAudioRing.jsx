import { useDashboard } from "../../../context/DashboardContext"
import { useEffect,useState } from "react"
import { emotionThemes } from "../../../utils/emotionTheme"
import useMicrophoneLevel from "../../../hooks/useMicrophoneLevel"

export default function SynapseAudioRing({speaking}){
    
    const {energy,mood}=useDashboard()

    const [time,setTime] =useState(0)

    const micLevel = useMicrophoneLevel()

    const theme= emotionThemes[mood] || emotionThemes.good

    useEffect(() => {
        const interval =
        setInterval(() => {
            setTime(prev => prev+.12)
        }, 16)

        return() => {
            clearInterval(interval)
        }
    },[])
    
    const voiceBoost=
    speaking
    ?
    10+
    Math.sin(
        time*10
    )*8
    :
    0

    const amp=
    theme.audio.amp
    +
    micLevel*.12
    +
    voiceBoost
    
    const points=[]
    const total=120
    const radius=110
    
    for(
        let i=0;
        i<=total;
        i++
    ){
        const angle=
        (i/total)*Math.PI*2
        
        const wave=
        Math.sin(
            i*.6+
            time
        )*amp

        const wave2=
        Math.cos(
            i*.3+
            time*2
        )*(amp*.5)

        const offset=
        wave+
        wave2
        
        const x=
        Math.cos(angle)
        *
        (radius+offset)
        
        const y=
        Math.sin(angle)
        *
        (radius+offset)
        
        points.push(`${x},${y}`)
    }
    
    return(
    
    <div className="
    absolute
    w-[300px]
    h-[300px]
    pointer-events-none">
        
        <svg
        viewBox="
        -150 -150
        300 300
        ">
            
            <polygon
            points={
                points.join(" ")
            }
            fill="none"
            stroke={theme.audio.stroke}
            strokeWidth="2.5"
            style={{
                filter: `drop-shadow(0 0 8px ${theme.audio.shadow})`
            }}
            />
            
        </svg>
    </div>
)
}