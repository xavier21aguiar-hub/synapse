import { useDashboard } from "../context/DashboardContext";
import SynapseCore from "../components/dashboard/synapse/SynapseCore"

export default function Habits(){

    const {habitsData,habitsForToday,habitLogs,completeHabit,pattern,insight} = useDashboard()

    const today = new Date()
    .toISOString()
    .split("T")[0]

    const completedTodayCount = habitLogs.filter(
        log => log.completed_date === today
    ).length

    const getHabitLogs = (habitId) => {
        return habitLogs.filter(
            log => log.habit_id === habitId
        )
    }

    const weekLabels = [
        "D",
        "L",
        "M",
        "Mi",
        "J",
        "V",
        "S"
    ]

    const getLast7Days = () => {
        const days = []

        for(let i = 6; i >= 0; i--){
            const date = new Date()

            date.setDate(date.getDate() - i)

            days.push({
                date: date.toISOString()
                .split("T")[0],

                label: weekLabels[date.getDay()]
            })
        }
        return days
    }
    const last7Days = getLast7Days()

    const calculateStreak = (habitDates) => {
        const sortedDates = [...habitDates]
        .sort()
        .reverse()

        let streak = 0

        const current = new Date()

        for(let i = 0; i < sortedDates.length; i++){
            const checkDate = new Date(current)

            checkDate.setDate(current.getDate() - i)

            const expected = checkDate
            .toISOString()
            .split("T")[0]

            if(
                sortedDates.includes(expected)
            ){
                streak++
            }else{
                break
            }
        }
        return streak
    }
    
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
                Hábitos
            </h1>

            <p className="
            mt-3
            text-white/50">
                Hoy has completado
                {" "}
                <span className="
                text-cyan-300">
                    {completedTodayCount}
                </span>
                {" "} de {" "}
                <span className="
                text-cyan-300">
                    {habitsForToday.length}
                </span>
                {" "}
                {habitsForToday.length === 1 ? "hábito" : "hábitos"}.
            </p>

        </div>

        {/* Layout */}
        <div className="
        mt-16
        max-w-7xl
        mx-auto
        grid
        grid-cols-[320px_1fr]
        gap-16
        items-start">

            {/* Synapse Insight */}
            <div className="
            relative
            flex
            items-center
            justify-center
            h-[500px]">

                {/* Burbuja */}
                <div className="
                absolute
                top-10
                left-60
                w-[260px]
                rounded-3xl
                border
                border-cyan-400/15
                bg-white/5
                backdrop-blur-xl
                p-5">

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
                    <p className="
                    text-sm
                    text-white/80">
                        {
                            pattern ||
                            "Synapse sigue aprendiendo sobre tus hábitos."
                        }
                    </p>
                </div>

                {/* Avatar */}
                <div className="
                bottom-0
                left-0
                scale-[0.9]">
                    <SynapseCore compact/>
                </div>

            </div>

            {/* Habitos */}
            <div className="
            rounded-3xl
            border
            border-cyan-400/15
            bg-white/5
            backdrop-blur-xl
            p-8
            ml-48">

                <h2 className="
                text-2xl
                font-semibold">
                    {habitsForToday.length === 1 ? "Hábito" : "Hábitos"} de hoy
                </h2>

                <div className="
                mt-8
                space-y-4">
                    {
                        habitsForToday.map(habit => {
                            const today = new Date()
                            .toISOString()
                            .split("T")[0]
                            
                            const completedToday = habitLogs.some(
                                log => log.habit_id === habit.id &&
                                log.completed_date === today
                            )

                            const logs = getHabitLogs(habit.id)

                            const habitDates = habitLogs
                            .filter(log => log.habit_id === habit.id)
                            .map(log => log.completed_date)

                            const streak = calculateStreak(habitDates)

                            const completedDays = last7Days.filter(
                                day => habitDates.includes(day.date)
                            ).length

                            const completionRate = Math.round(
                                (completedDays / 7) * 100
                            )
                            
                            return(
                            <div
                            key={habit.id}
                            className="
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            border
                            border-cyan-400/10
                            bg-slate-900/40
                            p-5">
                                <div>
                                    <p className="
                                    text-lg
                                    font-medium">
                                        {habit.icon}
                                        {" "}
                                        {habit.name}
                                    </p>
                                    
                                    <p className="
                                    text-sm
                                    text-white/50">
                                        {
                                            habit.frequency_type === "daily"
                                            ? "Diario"
                                            : habit.frequency_type === "weekly"
                                            ? "Semanal"
                                            : "Personalizado"
                                        }
                                        {
                                            habit.frequency_type === "custom" && (
                                                <p className="
                                                mt-1
                                                text-xs
                                                text-cyan-300">
                                                    {
                                                        JSON.parse(
                                                            habit.custom_days || "[]"
                                                        )
                                                        .map(day => {
                                                            const labels = {
                                                                0:"D",
                                                                1:"L",
                                                                2:"M",
                                                                3:"Mi",
                                                                4:"J",
                                                                5:"V",
                                                                6:"S"
                                                            }
                                                            return labels[day]
                                                        })
                                                        .join(" • ")
                                                    }
                                                </p>
                                            )
                                        }
                                    </p>

                                    <div className="
                                    mt-4
                                    flex
                                    gap-2
                                    mb-2">
                                        {
                                            last7Days.map(day => (
                                                <div 
                                                key={day.date}
                                                className="
                                                w-5
                                                text-center
                                                text-xs
                                                text/white/40">
                                                    {day.label}
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className="
                                    flex
                                    gap-2">
                                        {
                                            last7Days.map(day => (
                                                <div
                                                key={day.date}
                                                className={`
                                                w-5
                                                h-5
                                                rounded-md
                                                ${habitDates.includes(day.date)
                                                    ? "bg-cyan-400"
                                                    : "bg-cyan-400/20"
                                                }`}/>
                                            ))
                                        }
                                    </div>

                                    <p className="
                                    mt-3
                                    text-xs
                                    text-cyan-300">
                                        🔥 Racha: {streak} {streak === 1 ? "día" : "días"}
                                    </p>

                                    <p className={`
                                    mt-2
                                    text-xs
                                    ${completionRate >= 80
                                        ? "text-green-400"
                                        : completionRate >= 50
                                        ? "text-yellow-400"
                                        : "text-red-400"
                                    }`}>
                                        📈 Cumplimiento:
                                        {" "}
                                        {completionRate}%
                                    </p>
                                </div>
                                
                                {
                                    completedToday ? (
                                        <div className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-green-500/10
                                        text-green-400
                                        text-sm">
                                            ✓ Completado
                                        </div>
                                    ) : (
                                        <button
                                        onClick={() => completeHabit(habit.id)}
                                        className="
                                        w-10
                                        h-10
                                        rounded-full
                                        border
                                        border-cyan-400/20
                                        hover:bg-cyan-400/20
                                        transition">
                                            ✓
                                        </button>
                                    )
                                }
                            </div>
                        )
                    })
                    }
                    {
                        habitsData.length === 0 && (
                            <div className="
                            py-12
                            text-center
                            text-white/50">
                                Aún no has creado hábitos
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
)}
