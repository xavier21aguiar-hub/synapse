import { useDashboard } from "../../../context/DashboardContext"
import { useEffect,useState } from "react"
import { emotionThemes } from "../../../utils/emotionTheme"

export default function SynapseParticles(){

    const { energy, mood } = useDashboard()

    const [time,setTime] = useState(0)

    const theme= emotionThemes[mood] || emotionThemes.good

    useEffect(() => {
        const animation =

        setInterval(() => {
            setTime(
                prev => prev+.02
            )
        }, 16)

        return() => {
            clearInterval(animation)
        }
    },[])
    
    const particles=[
        {
            radiusX:120,
            radiusY:40,
            speed:1,
            size:"w-3 h-3"
        },
        {
            radiusX:150,
            radiusY:80,
            speed:.7,
            size:"w-5 h-5"
        },
        {
            radiusX:100,
            radiusY:60,
            speed:1.4,
            size:"w-2 h-2"
        },
        {
            radiusX:180,
            radiusY:50,
            speed:.5,
            size:"w-4 h-4"
        },
        {
            radiusX:130,
            radiusY:90,
            speed:1.2,
            size:"w-3 h-3"
        },
        {
            radiusX:160,
            radiusY:30,
            speed:1.8,
            size:"w-2 h-2"
        }
    ]
    
    return(
    <>
    {
    particles.map(
        (p,index)=>{
            const angle=
            time*p.speed+
            index

            const x=
            Math.cos(angle)
            *
            p.radiusX

            const y=
            Math.sin(angle)
            *
            p.radiusY

            return(
                <div
                key={index}
                style={{
                    transform:
                    `translate(
                    ${x}px,
                    ${y}px
                    )`
                }}
                className="
                absolute
                transition-transform
                duration-75
                ">
                    <div className={`
                        ${p.size}
                        ${theme.particle}
                        rounded-full
                        shadow-lg
                        relative
                        `}>
                            <div className={`
                            absolute
                            w-6
                            h-[2px]
                            right-1
                            top-1/2
                            ${theme.trail}
                            blur-sm`}/>
                        </div>
                </div>
            )
        }
    )}
    </>
    )
}