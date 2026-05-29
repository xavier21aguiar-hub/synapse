export default function Finance(){

    const insight = "Los gastos en comida representan la mayor parte de tus gastos registrados hoy."

    return(
        <div className="
        min-h-screen
        bg-slate-950
        text-white
        p-10">

            <div className="
            max-w-7xl
            mx-auto">

                <h1 className="
                text-5xl
                font-bold">
                    Finanzas
                </h1>

                <p className="
                mt-3
                text-white/50">
                    Hoy has mantenido gastos estables.
                </p>

            </div>

            <div className="
            mt-16
            flex
            flex-col
            items-center">
                
                <div className="
                w-[380px]
                h-[380px]
                rounded-full
                border
                border-cyan-400/20
                bg-white/5
                backdrop-blur-xl
                flex
                flex-col
                items-center
                justify-center">
                    
                    <p className="
                    text-white/50">
                        Balance disponible
                    </p>
                    
                    <h2 className="
                    text-5xl
                    font-bold
                    mt-4">
                        $12,480
                    </h2>

                    <div className="
                    mt-8
                    flex
                    gap-12">

                        <div className="
                        text-center">

                            <p className="
                            text-green-400
                            text-xl
                            font-semibold">
                                +$15,200
                            </p>

                            <p className="
                            text-white/50
                            text-sm">
                                Ingresos
                            </p>
                        </div>

                        <div className="
                        text-center">
                            
                            <p className="
                            text-red-400
                            text-xl
                            font-semibold">
                                -$2,520
                            </p>
                                
                            <p className="
                            text-white/50
                            text-sm">
                                Gastos
                            </p>
                        </div>
                    </div>
                </div>

                <div className="
                mt-12
                flex
                justify-center
                gap-6">
                    
                    <div className="
                    w-[180px]
                    h-[120px]
                    rounded-3xl
                    border
                    border-cyan-400/20
                    bg-white/5
                    backdrop-blur-xl
                    flex
                    flex-col
                    items-center
                    justify-center">
                        
                        <div className="text-3xl">
                            🍔
                        </div>
                            
                        <p className="
                        mt-2
                        font-semibold">
                            Comida
                        </p>
                        
                        <p className="
                        text-sm
                        text-white/50">
                            $1,200
                        </p>
                    </div>
                    
                    <div className="
                    w-[180px]
                    h-[120px]
                    rounded-3xl
                    border
                    border-cyan-400/20
                    bg-white/5
                    backdrop-blur-xl
                    flex
                    flex-col
                    items-center
                    justify-center">
                        
                        <div className="text-3xl">
                            🚗
                        </div>
                        
                        <p className="
                        mt-2
                        font-semibold">
                            Transporte
                        </p>
                        
                        <p className="
                        text-sm
                        text-white/50">
                            $650
                        </p>
                    </div>
                    
                    <div className="
                    w-[180px]
                    h-[120px]
                    rounded-3xl
                    border
                    border-cyan-400/20
                    bg-white/5
                    backdrop-blur-xl
                    flex
                    flex-col
                    items-center
                    justify-center">
                        
                        <div className="text-3xl">
                            🎮
                        </div>
                        
                        <p className="
                        mt-2
                        font-semibold">
                            Ocio
                        </p>
                        
                        <p className="
                        text-sm
                        text-white/50">
                            $450
                        </p>
                    </div>
                </div>

                <div className="
                mt-12
                flex
                justify-center">
                    <div className="
                    w-[700px]
                    rounded-3xl
                    border
                    border-cyan-400/15
                    bg-white/5
                    backdrop-blur-xl
                    p-8">
                        <div className="
                        flex
                        items-center
                        gap-3">

                            <div className="text-3xl">
                                🧠
                            </div>

                            <h3 className="
                            text-xl
                            font-semibold">
                                Synapse detecto 
                            </h3>
                        </div>

                        <p className="
                        mt-5
                        text-lg
                        text-white/80
                        leading-relaxed">
                            {insight}
                        </p>

                        <div className="
mt-6

rounded-2xl

bg-cyan-500/10

border
border-cyan-400/20

p-4">

    <p className="
    text-cyan-300">

        💡 Recomendación

    </p>

    <p className="
    mt-2
    text-white/70">

        Mantén este ritmo para conservar
        un balance positivo esta semana.

    </p>

</div>
                    </div>
                </div>

            </div>
        </div>
    )
}