import { useDashboard } from "../../../context/DashboardContext"
import { useEffect,useState } from "react"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function SynapseAudioRing(){
    
    const {energy,mood}=useDashboard()

    const [time,setTime] =useState(0)

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
    
    let amp=8

    if(
        energy>80
    ){
        amp=18
    }

    if(
        mood==="fatigued"
    ){
        amp=4
    }
    
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
            stroke={ringColor}
            strokeWidth="2.5"
            style={{
                filter: `drop-shadow(0 0 8px ${shadowColor})`
            }}
            />
            
        </svg>
    </div>
)
}