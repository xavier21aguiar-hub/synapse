import SynapseCore from "../components/dashboard/synapse/SynapseCore"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { useDashboard } from "../context/DashboardContext"

export default function Finance(){

    const synapseInsights = [
        {
            mood: "😊 Sereno",
            message: "He detectado que la mayor parte de tus gastos registrados hoy corresponden a comida."
        },
        {
            mood: "📈 Optimista",
            message: "Tu portafolio muestra un rendimiento positivo durante este periodo."
        },
        {
            mood: "🤔 Analizando",
            message: "Tus gastos en transporte han disminuido respecto a la semana anterior."
        },
        {
            mood: "💡 Reflexivo",
            message: "Mantienes una buena relación entre ingresos y gastos."
        }
    ]

    const financeData = [
        {
            day: "L",
            ingresos: 1200,
            gastos: 900
        },
        {
            day: "M",
            ingresos: 1800,
            gastos: 1100
        },
        {
            day: "Mi",
            ingresos: 1600,
            gastos: 1300
        },
        {
            day: "J",
            ingresos: 2200,
            gastos: 900
        },
        {
            day: "V",
            ingresos: 1900,
            gastos: 1500
        },
        {
            day: "S",
            ingresos: 2600,
            gastos: 1800
        },
        {
            day: "D",
            ingresos: 1700,
            gastos: 1200
        }
    ]

    const categoryIcons = {
        Comida:"🍔",
        Transporte:"🚗",
        Gasolina:"⛽",
        Casa:"🏠",
        Ocio:"🎮",
        Salud:"💊"
    }

    const [currentInsight, setCurrentInsight] = useState(0)

    const {transactions} = useDashboard()

    const totalIncome =
    transactions
        .filter(t => t.type === "income")
        .reduce((sum,t) =>
        sum + Number(t.amount),
    0)

    const totalExpenses =
    transactions
        .filter(t => t.type === "expense")
        .reduce((sum,t) =>
        sum + Number(t.amount),
    0)

    const balance = totalIncome - totalExpenses

    const topCategories = Object.values(
        transactions
        .filter(
            transaction =>
                transaction.type === "expense"
        )

        .reduce((acc,transaction) => {
            const category = transaction.category

            if(!acc[category]){
                acc[category] = {
                    name: category,
                    total: 0
                }
            }

            acc[category].total +=
            Number(transaction.amount)
            return acc
        },{})
    )
    .sort((a,b) =>
    b.total - a.total
)
.slice(0,3)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentInsight(prev =>
                (prev + 1) % synapseInsights.length
            )
        }, 8000)
        return () => clearInterval(interval)
    }, [])

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
            justify-center
            items-start
            gap-28">

                {/* Synapse Insight */}
                <div className="
                w-[280px]
                flex
                flex-col
                items-center">

                    {/* Burbuja */}
                    <div className="
                    max-w-[240px]
                    min-h-[140px]
                    self-end
                    -mr-12
                    rounded-3xl
                    border
                    border-cyan-400/15
                    bg-white/5
                    backdrop-blur-xl
                    p-4
                    relative">

                        {/* Pico de Burbuja */}
                        <div className="
                        absolute
                        left-3
                        bottom-[-10px]
                        -translate-x-3
                        w-4
                        h-4
                        rotate-90
                        bg-slate-900
                        border-r
                        border-b
                        border-cyan-400/15"/>

                        {/* Conversacion */}
                        <AnimatePresence mode="wait">

                            <motion.p
                            key={currentInsight}
                            initial={{
                                opacity: 0,
                                y: 10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: -10
                            }}
                            transition={{
                                duration: 0.4
                            }}
                            className="
                            text-sm
                            text-white/80
                            leading-relaxed">
                                {synapseInsights[currentInsight].message}
                            </motion.p>

                        </AnimatePresence>

                        <AnimatePresence mode="wait">

                            <motion.p
                            key={currentInsight}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.4
                            }}
                            className="
                            mt-3
                            text-cyan-300
                            text-sm">
                                {synapseInsights[currentInsight].mood}
                            </motion.p>
                            
                        </AnimatePresence>

                    </div>

                    {/* Avatar */}
                    <div className="
                    scale-[0.75]
                    -mt-60
                    -mb-20
                    mr-64">
                        <SynapseCore compact/>
                    </div>

                </div>

                {/* Balance */}
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
                        ${balance.toLocaleString()}
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
                                +${totalIncome.toLocaleString()}
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
                                -${totalExpenses.toLocaleString()}
                            </p>
                                
                            <p className="
                            text-white/50
                            text-sm">
                                Gastos
                            </p>
                        </div>
                    </div>
                </div>

                {/* Historial */}
                <div className="
                w-[260px]
                rounded-3xl
                border
                border-cyan-400/15
                bg-white/5
                backdrop-blur-xl
                p-8">
                    
                    <h3 className="
                    text-2xl
                    font-semibold
                    mb-6">
                        📜 Historial
                    </h3>

                    <div className="
                    space-y-4">
                        {
                            transactions
                            .slice(0,5)
                            .map((transaction)=> (
                                <div
                                key={transaction.id}
                                className="
                                flex
                                items-center
                                justify-between">
                                    <div>
                                        <p>
                                            {transaction.description}
                                        </p>

                                        <p className="
                                        text-xs
                                        text-white/50">
                                            {transaction.category}
                                        </p>
                                    </div>

                                    <span className={
                                        transaction.type === "expense"
                                        ? "text-red-400"
                                        : "text-green-400"
                                    }>
                                        {transaction.type === "expense"
                                        ? "-"
                                        : "+"
                                        }

                                        ${transaction.amount}
                                    </span>
                                </div>
                            ))
                        }
                    </div>

                    <button
                    className="
                    mt-6
                    w-full
                    rounded-2xl
                    border
                    border-cyan-400/15
                    py-2
                    text-sm
                    transition-all
                    duration-300
                    hover:bg-white/5
                    hover:border-cyan-400/30">
                        Ver historial completo
                    </button>

                </div>
            </div>

            {/* Grafico + Categorias */}
            <div className="
            mt-12
            flex
            justify-center
            items-start
            gap-8">

                {/* Grafico */}
                <div className="
                flex-1
                max-w-4xl
                rounded-3xl
                border
                border-cyan-400/15
                bg-white/5
                backdrop-blur-xl
                p-8">
                    
                    <h3 className="
                    text-2xl
                    font-semibold">
                        Tendencia financiera
                    </h3>
                            
                    <p className="
                    mt-2
                    text-white/50">
                        Actividad de los últimos 7 días
                    </p>

                    <div className="
                    mt-8
                    h-[350px]
                    rounded-2xl
                    border
                    border-dashed
                    border-cyan-400/10">

                        <div className="
                        flex
                        gap-6
                        mb-6">
                            
                            <div className="
                            flex
                            items-center
                            gap-2">
                                
                                <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-green-400"/>
                                <span>Ingresos</span>
                            
                            </div>
                            
                            <div className="
                            flex
                            items-center
                            gap-2">
                                <div className="
                                w-3
                                h-3
                                rounded-full
                                bg-red-400"/>
                                <span>Gastos</span>
                            </div>
                        </div>

                        <ResponsiveContainer
                        width="100%"
                        height={300}>

                            <LineChart
                            data={financeData}>

                                <XAxis
                                dataKey="day"
                                stroke="#94A3B8"/>
                                
                                <YAxis
                                stroke="#94A3B8"/>

                                <Tooltip/>

                                <Line
                                type="monotone"
                                dataKey="ingresos"
                                stroke="#34D399"
                                strokeWidth={4}
                                dot={false}
                                filter="drop-shadow(0 0 8px rgba(34,211,238,.4))"
                                />
                                    
                                <Line
                                type="monotone"
                                dataKey="gastos"
                                stroke="#F87171"
                                strokeWidth={4}
                                dot={false}
                                filter="drop-shadow(0 0 8px rgba(34,211,238,.4))"
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                {/* Categorias */}
                <div className="
                w-[260px]
                rounded-3xl
                border
                border-cyan-400/15
                bg-white/5
                backdrop-blur-xl
                p-6">
                        
                    <h3 className="
                    text-xl
                    font-semibold">
                        Top categorías
                    </h3>
                            
                    <p className="
                    mt-2
                    text-white/50
                    text-sm">
                        Donde más has gastado
                    </p>
                        
                    <div className="
                    mt-8
                    space-y-6">
                        {
                            topCategories.map(
                                (category) => (
                                    <div
                                    key={category.name}
                                    className="
                                    flex
                                    items-center
                                    justify-between">

                                        <div className="
                                        flex
                                        items-center
                                        gap-3">
                                            <span className="
                                            text-2xl">
                                                {categoryIcons[
                                                    category.name
                                                ] || "📊"}
                                            </span>

                                            <span>
                                                {category.name}
                                            </span>
                                        </div>

                                        <span className="
                                        text-cyan-300
                                        font-semibold">
                                            ${category.total
                                            .toLocaleString()}
                                        </span>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Portafolio */}
            <div className="
            mt-12
            w-full
            max-w-6xl
            mx-auto
            rounded-3xl
            border
            border-cyan-400/15
            bg-white/5
            backdrop-blur-xl
            p-8">
                
                {/* Header */}
                <div className="
                flex
                items-center
                justify-between">
                    
                    <div>
                        <h3 className="
                        text-2xl
                        font-semibold">
                            📈 Portafolio
                        </h3>
                        
                        <p className="
                        mt-2
                        text-white/50">
                            Crecimiento de tus inversiones
                        </p>
                    </div>
                    
                    <div className="text-right">
                        <p className="
                        text-green-400
                        text-3xl
                        font-bold">
                            +8.4%
                        </p>
                        
                        <p className="
                        text-white/50
                        text-sm">
                            Rendimiento anual
                        </p>
                    </div>
                </div>
                
                {/* Activos */}
                <div className="
                mt-8
                grid
                grid-cols-3
                gap-6">
                    
                    {/* ETF */}
                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6">
                        
                        <p className="
                        text-white/50">
                            ETF
                        </p>
                        
                        <h4 className="
                        mt-2
                        text-xl
                        font-semibold">
                            VOO
                        </h4>
                        
                        <p className="
                        mt-4
                        text-green-400
                        font-semibold">
                            +12.3%
                        </p>
                    </div>
                    
                    {/* Accion */}
                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6">
                        
                        <p className="
                        text-white/50">
                            Acción
                        </p>
                        
                        <h4 className="
                        mt-2
                        text-xl
                        font-semibold">
                            AAPL
                        </h4>
                        
                        <p className="
                        mt-4
                        text-green-400
                        font-semibold">
                            +7.2%
                        </p>
                    </div>
                    
                    {/* Crypto */}
                    <div className="
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-slate-900/40
                    p-6">
                        
                        <p className="
                        text-white/50">
                            Crypto
                        </p>
                        
                        <h4 className="
                        mt-2
                        text-xl
                        font-semibold">
                            BTC
                        </h4>
                        
                        <p className="
                        mt-4
                        text-green-400
                        font-semibold">
                            +18.7%
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}