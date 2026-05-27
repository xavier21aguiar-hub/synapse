export default function StatRing({
    value=70,
    label,
    color,
    icon
}){
    const radius=32

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
            <svg width="110" height="110">
                <circle 
                cx="60"
                cy="60"
                r={radius}
                stroke="rgba(255,255,255,.08)"
                strokeWidth="10"
                fill="none"
                />

                <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={color}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={
                    circumference
                }
                strokeDashoffset={
                    offset
                }
                transform="rotate(-90 60 60)"
                />

                <text
                x="50%"
                y="50%"
                fill="white"
                textAnchor="middle"
                dy=".3em">
                    {value}%
                </text>
            </svg>

            <div className="
                mt-1
                text-cyan-300">
                    {icon}
            </div>

            <p className="
            mt-2
            text-sm
            opacity-80">
                {label}
            </p>
        </div>
    )
}