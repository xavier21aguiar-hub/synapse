import SynapseCore from "../components/dashboard/synapse/SynapseCore"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, progress } from "framer-motion"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import { useDashboard } from "../context/DashboardContext"
import { saveGoal } from "../services/goalService"
import { savePortfolioAsset } from "../services/portfolioService"

export default function Finance(){

    const [showHistoryModal,setShowHistoryModal] = useState(false)
    const [showGoalModal,setShowGoalModal] = useState(false)
    const [showGoals,setShowGoals] = useState(false)
    const [showAssetModal,setShowAssetModal] = useState(false)
    const [showPortfolio,setShowPortfolio] = useState(false)

    const [goalName,setGoalName] = useState("")
    const [targetAmount,setTargetAmount] = useState("")
    const [currentAmount,setCurrentAmount] = useState("")
    const [goalIcon,setGoalIcon] = useState("🎯")

    const [symbol,setSymbol] = useState("")
    const [assetName,setAssetName] = useState("")
    const [assetType,setAssetType] = useState("ETF")
    const [investedAmount,setInvestedAmount] = useState("") 
    const [currentValue,setCurrentValue] = useState("")

    const categoryIcons = {
        Comida:"🍔",
        Transporte:"🚗",
        Gasolina:"⛽",
        Casa:"🏠",
        Ocio:"🎮",
        Salud:"💊",
        Compras:"🛍️",
        Mascotas:"🐶",
        Educación:"🎓",
        Viajes:"✈️",
        Servicios:"📱"
    }

    const [currentInsight, setCurrentInsight] = useState(0)

    const {transactions,goals,loadGoals,portfolioAssets,loadPortfolioAssets} = useDashboard()

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

    const chartData = Object.values(
        transactions.reduce((acc,transaction)=>{
            const day = new Date(
                transaction.transaction_date
            )
            .toLocaleDateString("es-MX",{
                day:"numeric",
                month:"short"
            })

            if(!acc[day]){
                acc[day] = {
                    day,
                    date: transaction.transaction_date, 
                    ingresos:0,
                    gastos:0
                }
            }

            if(
                transaction.type === "income"
            ){
                acc[day].ingresos +=
                Number(transaction.amount)
            }else{
                acc[day].gastos +=
                Number(transaction.amount)
            }
            return acc
        },{})
    ).sort(
        (a,b) => new Date(a.date) - new Date(b.date)
    )

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

    const totalMovements = transactions.length
    const mainCategory = topCategories[0]?.name || null
    const mainCategoryAmount = topCategories[0]?.total || 0

    const featuredGoals = goals
    .slice(0,3)
    .map(goal => ({
        ...goal,
        progress: Math.min(
            (
                Number(goal.current_amount)
                /
                Number(goal.target_amount)
            ) * 100,
            100
        )
    }))

    const featuredAssets = portfolioAssets
    .slice(0,3)
    .map(asset => {
        const profit = Number(
            asset.current_value
        )
        -
        Number(
            asset.invested_amount
        )

        const returnPct = (
            profit / Number(asset.invested_amount)
        ) * 100

        return{
            ...asset,
            profit,
            returnPct
        }
    })

    const handleCreateGoal = async() => {
        await saveGoal({
            user_id:"00000000-0000-0000-0000-000000000001",
            name: goalName,
            target_amount: Number(targetAmount),
            current_amount: Number(currentAmount),
            icon: goalIcon
        })

        await loadGoals()
        setGoalName("")
        setTargetAmount("")
        setCurrentAmount("")
        setGoalIcon("🎯")

        setShowGoalModal(false)
    }

    const handleCreateAsset = async() => {
        try{
            await savePortfolioAsset({
                user_id:"00000000-0000-0000-0000-000000000001",
                symbol,
                asset_name: assetName,
                asset_type: assetType,
                invested_amount: Number(investedAmount),
                current_value: Number(currentValue)
            })

            await loadPortfolioAssets()

            setSymbol("")
            setAssetName("")
            setAssetType("ETF")
            setInvestedAmount("")
            setCurrentValue("")
            setShowAssetModal(false)
        }catch(error){
            console.error(error)
        }
    }

    const totalInvested = portfolioAssets.reduce(
        (sum,asset) =>
            sum +
        Number(
            asset.invested_amount
        ),
        0
    )
    
    const totalCurrent = portfolioAssets.reduce(
        (sum,asset) =>
            sum +
        Number(
            asset.current_value
        ),
        0
    )
    
    const portfolioReturn = totalInvested > 0
    ? (
        (
            totalCurrent -
            totalInvested
        )
        /
        totalInvested
    ) * 100
    : 0

    const synapseInsights = [
        {
            mood: "📊 Analizando",
            message: mainCategory
            ? `He detectado que tu categoría principal es ${mainCategory} con $${mainCategoryAmount.toLocaleString()}.`
            : "Aún no hay suficientes movimientos para analizar."
        },
        {
            mood: "📈 Optimista",
            message: balance > 0
            ? `Tus ingresos superan tus gastos por $${balance.toLocaleString()}.`
            : "Tus gastos actualmente superan tus ingresos."
        },
        {
            mood: "🧠 Observando",
            message: `Has registrado ${totalMovements} movimientos financieros.`
        },
        {
            mood: "💰 Estratégico",
            message: totalExpenses > 0
            ? `Tus gastos actuales representan ${Math.round((totalExpenses / Math.max(totalIncome,1))*100)}% de tus ingresos.`
            : "Todavía no se han registrado gastos."
        }
    ]

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
                    onClick={()=> setShowHistoryModal(true)}
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

                {
                    showHistoryModal && (
                        <div className="
                        fixed
                        inset-0
                        bg-black/70
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        z-50">
                            <div className="
                            w-[700px]
                            max-h-[80vh]
                            overflow-y-auto
                            rounded-3xl
                            border
                            border-cyan-400/15
                            bg-slate-950
                            p-8">
                                {/* Header */}
                                <div className="
                                flex
                                justify-between
                                items-center">
                                    <h2 className="
                                    text-2xl
                                    font-bold">
                                        Historial financiero
                                    </h2>

                                    <button onClick={()=>
                                        setShowHistoryModal(false)
                                    } className="
                                    text-white/50
                                    hover:text-white">
                                        ✕
                                    </button>
                                </div>

                                {/* Lista */}
                                <div className="
                                mt-8
                                space-y-4">
                                    {
                                        transactions.map(
                                            (transaction) => (
                                                <div
                                                key={transaction.id}
                                                className="
                                                flex
                                                justify-between
                                                items-center
                                                rounded-2xl
                                                border
                                                border-cyan-400/10
                                                p-4">
                                                    <div>
                                                        <p>
                                                            {transaction.description}
                                                        </p>

                                                        <p className="
                                                        text-sm
                                                        text-white/50">
                                                            {transaction.category}
                                                        </p>
                                                    </div>

                                                    <span className={
                                                        transaction.type === "expense"
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                    }>
                                                        {
                                                            transaction.type === "expense"
                                                            ? "-"
                                                            : "+"
                                                        }
                                                        ${transaction.amount}
                                                    </span>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
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
                            data={chartData}>

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

            {/* Metas financieras */}
            <div
            className="
            mt-12
            w-full
            max-w-6xl
            mx-auto">
                
                <h3
                className="
                text-2xl
                font-semibold">
                    🎯 Metas financieras
                </h3>
                
                <div
                className="
                mt-8
                flex
                justify-center
                gap-10">
                    
                    {
                    featuredGoals.map(
                        goal => (
                        <div
                        key={goal.id}
                        className="
                        group
                        relative
                        flex
                        flex-col
                        items-center
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:scale-105">
                            
                            <div
                            className="
                            relative
                            w-28
                            h-28">
                                <svg className="
                                absolute
                                inset-0
                                w-full
                                h-full
                                -rotate-90"
                                viewBox="0 0 100 100">

                                    {/* Fondo */}
                                    <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="rgba(255,255,255,.08)"
                                    strokeWidth="8"/>

                                    {/* Progreso */}
                                    <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="none"
                                    stroke="rgb(34 211 238)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray="264"
                                    strokeDashoffset={264 - (
                                        264 * 
                                        goal.progress
                                    ) / 100
                                    }/>
                                </svg>
                                
                                <div className="
                                absolute
                                inset-0
                                flex
                                flex-col
                                items-center
                                justify-center">
                                    <span className="text-2xl">
                                        {goal.icon}
                                    </span>

                                    <span className="
                                    text-xs
                                    text-cyan-300">
                                        {goal.progress.toFixed(0)}%
                                    </span>
                                </div>
                            </div>

                            <div className="
                            absolute
                            bottom-full
                            mt-3
                            opacity-0
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            transition-all
                            duration-300
                            pointer-events-none
                            z-20">
                                <div className="
                                rounded-xl
                                border
                                border-cyan-400/15
                                bg-slate-950
                                px-3
                                py-2
                                whitespace-nowrap
                                text-xs">
                                    ${Number(goal.current_amount)
                                    .toLocaleString()}
                                    
                                    {" / "}
                                    
                                    ${Number(goal.target_amount)
                                    .toLocaleString()}
                                </div>
                            </div>
                            
                            <p
                            className="
                            mt-4
                            text-sm
                            font-medium">
                                {goal.name}
                            </p>

                        </div>
                    ))
                    }
                    <button
                    onClick={()=> setShowGoalModal(true)}
                    className="
                    w-28
                    h-28
                    rounded-full
                    border-2
                    border-dashed
                    border-cyan-400/20
                    flex
                    items-center
                    justify-center
                    text-4xl
                    hover:border-cyan-400/50
                    hover:bg-white/5
                    transition-all">
                        +
                    </button>
                </div>

                <div
                className="
                mt-6
                flex
                justify-center">
                    
                    <button
                    onClick={() =>
                        setShowGoals(true)
                    }
                    className="
                    text-cyan-300
                    hover:text-cyan-200
                    transition">
                        Ver todas →
                    </button>
                </div>

                {
                    showGoalModal && (
                        <div className="
                        fixed
                        inset-0
                        bg-black/70
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        z-50">
                            <div className="
                            w-[500px]
                            rounded-3xl
                            border
                            border-cyan-400/15
                            bg-slate-950
                            p-8">
                                <div className="
                                flex
                                justify-between
                                items-center">

                                    <h2 className="
                                    text-2xl
                                    font-bold">
                                        Nueva meta
                                    </h2>

                                    <button onClick={()=>
                                        setShowGoalModal(false)
                                    }>
                                        ✕
                                    </button>
                                </div>

                                <input
                                value={goalName}
                                onChange={(e)=> setGoalName(
                                    e.target.value
                                )}
                                placeholder="Universidad"
                                className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-white/5
                                p-4"/>

                                <input type="number"
                                value={targetAmount}
                                onChange={(e)=> setTargetAmount(
                                    e.target.value
                                )}
                                placeholder="Monto objetivo"
                                className="
                                mt-4
                                w-full
                                rounded-xl
                                bg-white/5
                                p-4"/>

                                <input type="number"
                                value={currentAmount}
                                onChange={(e)=> setCurrentAmount(
                                    e.target.value
                                )}
                                placeholder="Monto actual"
                                className="
                                mt-4
                                w-full
                                rounded-xl
                                bg-white/5
                                p-4"/>

                                <input
                                value={goalIcon}
                                onChange={(e)=> setGoalIcon(
                                    e.target.value
                                )}
                                placeholder="🎓"
                                className="
                                mt-4
                                w-full
                                rounded-xl
                                bg-white/5
                                p-4"/>

                                <button 
                                onClick={handleCreateGoal}
                                className="
                                mt-6
                                w-full
                                bg-cyan-500
                                py-3
                                rounded-xl">
                                    Crear meta
                                </button>
                            </div>
                        </div>
                    )
                }
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
                    
                    <div className="
                    flex
                    items-center
                    gap-4">
                        <p className="
                        text-green-400
                        text-3xl
                        font-bold">
                            {
                                portfolioReturn
                                .toFixed(1)
                            }%
                        </p>
                        
                        <p className="
                        text-white/50
                        text-sm">
                            Rendimiento anual
                        </p>

                        <button
                        onClick={() => setShowAssetModal(true)}
                        className="
                        w-10
                        h-10
                        rounded-full
                        border
                        border-cyan-400/20
                        hover:border-cyan-400/50
                        hover:bg-white/5
                        transition-all">
                            +
                        </button>
                    </div>
                </div>
                
                {/* Activos */}
                <div className="
                mt-8
                grid
                grid-cols-3
                gap-6">
                    
                    {
                        featuredAssets.map((asset)=> (
                            <div
                            key={asset.id}
                            className="
                            rounded-2xl
                            border
                            border-cyan-400/10
                            bg-slate-900/40
                            p-6">

                                <p className="text-white/50">
                                    {asset.asset_type}
                                </p>

                                <h4 className="
                                mt-2
                                text-xl
                                font-semibold">
                                    {asset.symbol}
                                </h4>

                                <p className="
                                mt-3
                                text-white/70
                                text-sm">
                                    {asset.asset_name}
                                </p>

                                <p className="
                                mt-4
                                text-lg">
                                    ${
                                        Number(asset.current_value)
                                        .toLocaleString()
                                    }
                                </p>

                                <p className={asset.returnPct >= 0
                                    ? `
                                    mt-2
                                    text-green-400
                                    font-semibold`

                                    : `
                                    mt-2
                                    text-red-400
                                    font-semibold`
                                }>
                                    {
                                        asset.returnPct >= 0
                                        ? "+"
                                        : ""
                                    }
                                    {
                                        asset.returnPct
                                        .toFixed(1)
                                    }%
                                </p>
                            </div>
                        ))
                    }
                </div>

                <div className="
                mt-6
                flex
                justify-center">
                    <button
                    onClick={() => 
                        setShowPortfolio(true)
                    }
                    className="
                    text-cyan-300
                    hover:text-cyan-200
                    transition">
                        Ver todos →
                    </button>
                </div>
            </div>

            {
                showAssetModal && (
                <div className="
                fixed
                inset-0
                bg-black/70
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50">
                    <div className="
                    w-[550px]
                    rounded-3xl
                    border
                    border-cyan-400/15
                    bg-slate-950
                    p-8">
                        <div className="
                        flex
                        justify-between
                        items-center">

                            <h2 className="
                            text-2xl
                            font-bold">
                                Nuevo activo 
                            </h2>

                            <button
                            onClick={()=> setShowAssetModal(false)}>
                                ✕
                            </button>
                        </div>

                        <input
                        value={symbol}
                        onChange={(e)=>
                            setSymbol(e.target.value)
                        }
                        placeholder="VOO"
                        className="
                        mt-6
                        w-full
                        rounded-xl
                        bg-white/5
                        p-4"/>

                        <input
                        value={assetName}
                        onChange={(e)=>
                            setAssetName(e.target.value)
                        }
                        placeholder="Vanguard S&P 500 ETF"
                        className="
                        mt-4
                        w-full
                        rounded-xl
                        bg-white/5
                        p-4"/>

                        <select
                        value={assetType}
                        onChange={(e)=>
                            setAssetType(e.target.value)
                        }
                        className="
                        mt-4
                        w-full
                        rounded-xl
                        bg-white/5
                        p-4">
                            <option>ETF</option>
                            <option>Acción</option>
                            <option>Crypto</option>
                        </select>

                        <input type="number" 
                        value={investedAmount}
                        onChange={(e)=>
                            setInvestedAmount(e.target.value)
                        }
                        placeholder="Monto invertido"
                        className="
                        mt-4
                        w-full
                        rounded-xl
                        bg-white/5
                        p-4"/>

                        <input type="number" 
                        value={currentValue}
                        onChange={(e)=>
                            setCurrentValue(e.target.value)
                        }
                        placeholder="Valor actual"
                        className="
                        mt-4
                        w-full
                        rounded-xl
                        bg-white/5
                        p-4"/>

                        <button
                        onClick={handleCreateAsset}
                        className="
                        mt-6
                        w-full
                        bg-cyan-500
                        py-3
                        rounded-xl">
                            Crear activo
                        </button>
                    </div>
                </div>
                )
            }
            {
                showPortfolio && (
                    <div className="
                    fixed
                    inset-0
                    bg-black/70
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    z-50">
                        <div className="
                        w-[800px]
                        max-h-[80vh]
                        overflow-y-auto
                        rounded-3xl
                        border
                        border-cyan-400/15
                        bg-slate-950
                        p-8">

                            {/* Header */}
                            <div className="
                            flex
                            justify-between
                            items-center">

                                <h2 className="
                                text-2xl
                                font-bold">
                                    Portafolio completo
                                </h2>

                                <button
                                onClick={()=> 
                                    setShowPortfolio(false)
                                }>
                                    ✕
                                </button>
                            </div>

                            {/* Lista */}
                            <div className="
                            mt-8
                            space-y-4">
                                {
                                    portfolioAssets.map(
                                        asset => {
                                            const profit =
                                            Number(asset.current_value)
                                            -
                                            Number(asset.invested_amount)

                                            const returnPct = 
                                            (
                                                profit
                                                /
                                                Number(asset.invested_amount)
                                            ) * 100

                                            return(
                                                <div
                                                key={asset.id}
                                                className="
                                                flex
                                                justify-between
                                                items-center
                                                rounded-2xl
                                                border
                                                border-cyan-400/10
                                                p-5">
                                                    <div>
                                                        <p className="
                                                        text-lg
                                                        font-semibold">
                                                            {asset.symbol}
                                                        </p>

                                                        <p className="
                                                        text-white/50">
                                                            {asset.asset_name}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p>
                                                            ${
                                                                Number(asset.current_value)
                                                                .toLocaleString()
                                                            }
                                                        </p>

                                                        <p className={
                                                            returnPct >= 0
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                        }>
                                                            {
                                                                returnPct >= 0
                                                                ? "+"
                                                                : ""
                                                            }{
                                                                returnPct
                                                                .toFixed(1)
                                                            }%
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}