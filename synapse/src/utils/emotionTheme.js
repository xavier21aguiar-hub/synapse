export const emotionThemes={
    
    good:{
        glow:"shadow-cyan-500/50",
        gradient:"from-cyan-400 to-blue-700",
        ring:"ring-cyan-400/40",
        eyeColor:"rgba(255,255,255,.95)",
        particle:"bg-cyan-300",
        trail:"bg-cyan-300/30",
        
        orbit:[
            "border-cyan-400/15",
            "border-blue-300/10",
            "border-cyan-300/20"
        ],
        cells:[
            "bg-cyan-400/10",
            "bg-blue-300/20"
        ],
        
        thought:{
            bg:"bg-cyan-400/10",
            border:"border-cyan-300/20",
            text:"text-cyan-100"
        },
        audio:{
            stroke:"rgba(80,220,255,.35)",
            shadow:"rgb(80,220,255)",
            amp: 8
        },
        blink:{
            interval:4000,
            duration:150
        },
        breathing:{
            speed:4,
            amp:.03
        },
        animation:"",
        eyePath:"M2 12 Q15 2 28 12"
    },
    
    fatigued:{
        glow:"shadow-purple-500/70",
        gradient:"from-purple-500 to-indigo-700",
        ring:"ring-purple-400/40",
        eyeColor:"rgba(220,190,255,.95)",
        particle:"bg-purple-400",
        trail:"bg-purple-300/30",
        
        orbit:[
            "border-purple-400/25",
            "border-violet-300/20",
            "border-indigo-300/25"
        ],
        cells:[
            "bg-purple-400/10",
            "bg-violet-300/20"
        ],
        
        thought:{
            bg:"bg-purple-500/10",
            border:"border-purple-300/20",
            text:"text-purple-100"
        },
        audio:{
            stroke:"rgba(180,120,255,.45)",
            shadow:"rgb(180,120,255)",
            amp:4
        },
        blink:{
            interval:7000,
            duration:900
        },
        breathing:{
            speed:8,
            amp:.015
        },
        animation:"",
        eyePath:"M2 12 Q15 12 28 12"
    },
    
    calm:{
        glow:"shadow-emerald-400/50",
        gradient:"from-emerald-300 to-cyan-500",
        ring:"ring-emerald-300/40",
        eyeColor:"rgba(220,255,230,.95)",
        particle:"bg-emerald-300",
        trail:"bg-emerald-300/30",
        
        orbit:[
            "border-emerald-400/20",
            "border-cyan-300/10",
            "border-emerald-200/15"
        ],
        cells:[
            "bg-emerald-400/10",
            "bg-green-300/20"
        ],
        
        thought:{
            bg:"bg-emerald-500/10",
            border:"border-emerald-300/20",
            text:"text-emerald-100"
        },
        audio:{
            stroke:"rgba(100,255,180,.35)",
            shadow:"rgb(100,255,180)",
            amp:5
        },
        blink:{
            interval:6000,
            duration:220
        },
        breathing:{
            speed:10,
            amp:.02
        },
        animation:"",
        eyePath:"M2 12 Q15 5 28 12"
    },
    
    stressed:{
        glow:"shadow-orange-500/50",
        gradient:"from-orange-400 to-red-500",
        ring:"ring-orange-300/40",
        eyeColor:"rgba(255,230,220,.95)",
        particle:"bg-orange-300",
        trail:"bg-orange-300/30",
        
        orbit:[
            "border-orange-300/20",
            "border-red-300/15",
            "border-orange-200/20"
        ],
        cells:[
            "bg-orange-400/10",
            "bg-red-300/20"
        ],
        
        thought:{
            bg:"bg-orange-500/10",
            border:"border-orange-300/20",
            text:"text-orange-100"
        },
        audio:{
            stroke:"rgba(255,170,90,.35)",
            shadow:"rgb(255,170,90)",
            amp: 14
        },
        blink:{
            interval:1800,
            duration:100
        },
        breathing:{
            speed:2,
            amp:.05
        },
        animation:"animate-[pulse_1s_ease-in-out_infinite]",
        eyeType:"slash",
        
        eyePath:"M2 12 Q15 -18 28 12"
    },
    
    energized:{
        glow:"shadow-sky-500/80",
        gradient:"from-sky-300 to-cyan-600",
        ring:"ring-blue-300/40",
        eyeColor:"rgba(255,255,255,.95)",
        particle:"bg-sky-300",
        trail:"bg-sky-300/30",
        
        orbit:[
            "border-sky-300/20",
            "border-cyan-200/15",
            "border-blue-200/20"
        ],
        cells:[
            "bg-sky-400/10",
            "bg-cyan-300/20"
        ],
        
        thought:{
            bg:"bg-sky-500/10",
            border:"border-sky-300/20",
            text:"text-sky-100"
        },
        audio:{
            stroke:"rgba(120,220,255,.45)",
            shadow:"rgb(120,220,255)",
            amp: 18
        },
        blink:{
            interval:3000,
            duration:80
        },
        breathing:{
            speed:1.5,
            amp:.06
        },
        animation:"animate-pulse",
        eyePath:"M2 12 Q15 -14 28 12"
    }

}