import { useEffect,useState } from "react"
import { useDashboard } from "../../../context/DashboardContext"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function SynapseOrbit(){
    
    const [time,setTime]=useState(0)
    const {mood,energy} = useDashboard()

    const theme= emotionThemes[mood] || emotionThemes.good
    
    useEffect(()=>{
        
        const id = setInterval(()=>{
            
            setTime(prev=>prev+.01)
        },16)
        
        return()=>{
            clearInterval(id)
        }
    },[])
    
    const rings=[
        
        {
            size:"w-72 h-28",
            rotation:20,
            speed:.4,
            opacity:ringTheme[0]
        },
        {
            size:"w-80 h-32",
            rotation:-30,
            speed:.2,
            opacity:ringTheme[1]
        },
        {
            size:"w-60 h-24",
            rotation:65,
            speed:.7,
            opacity:ringTheme[2]
        }
    ]
    
    return(
    
    <>
    {
    rings.map((r,index)=>{
        
        const angle=
        time*
        r.speed
        
        const x=
        Math.sin(angle)*8
        
        const y=
        Math.cos(angle)*4
        
        return(
        <div
        key={index}
        style={{
            transform:
            `
            translate(
            ${x}px,
            ${y}px
            )
            
            rotate(
            ${r.rotation}deg
            )
            `
        }}
        
        className={`
            absolute
            ${r.size}
            border
            ${r.opacity}
            rounded-full
            transition-all
            duration-75
            `}
        />
    )
}
)
}
</>
)
}