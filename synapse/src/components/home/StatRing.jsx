export default function StatRing({
    value=70,
    label,
    color,
    icon
}){
    const radius=24

    const circumference=
    2*Math.PI*radius

    const offset=
    circumference-
    (
        (value/100)*circumference
    )

    return(
        <div className="
        flex
        flex-col
        items-center">
            <svg width="82" height="82">
                <circle 
                cx="41"
                cy="41"
                r={radius}
                stroke="rgba(255,255,255,.08)"
                strokeWidth="10"
                fill="none"
                />

                <circle
                cx="41"
                cy="41"
                r={radius}
                stroke={color}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={
                    circumference
                }
                strokeDashoffset={
                    offset
                }
                transform="rotate(-90 41 41)"
                style={{
                    filter:`drop-shadow(0 0 6px ${color})`
                }}
                />

                <text
                x="50%"
                y="50%"
                fill="white"
                fontSize="12"
                fontWeight="600"
                textAnchor="middle"
                dy=".35em">
                    {value}%
                </text>
            </svg>

            <div className="
                mt-1
                text-cyan-300
                scale-90
                opacity-80">
                    {icon}
            </div>

            <p className="
            mt-2
            text-[11px]
            text-white/50
            tracking-wide">
                {label}
            </p>
        </div>
    )
}