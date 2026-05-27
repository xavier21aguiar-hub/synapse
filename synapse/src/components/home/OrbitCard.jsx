export default function OrbitCard({
    title,
    icon,
    children
}){
    return(
    <div className="
    absolute
    w-52
    h-52
    rounded-full
    hover:border-cyan-400/30
    bg-slate-900/60
    backdrop-blur-xl
    border
    border-white/10
    flex
    flex-col
    justify-center
    items-center
    shadow-[0_0_30px_rgba(0,255,255,.1)]
    hover:scale-105
    transition-all
    ">
        
        <div className="
        text-cyan-300
        drop-shadow-[0_0_10px_rgba(0,255,255,.35)]">
            {icon}
        </div>
        
        <h2 className="
        font-semibold
        mt-2">
            {title}
        </h2>
        
        <p className="
        text-xs
        opacity-70
        text-center
        px-3">
            {children}
        </p>
    </div>
)
}