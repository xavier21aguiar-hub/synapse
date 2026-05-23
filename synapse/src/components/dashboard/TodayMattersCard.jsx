import { useDashboard } from "../../context/DashboardContext"
import { Check, Trash2 } from "lucide-react"
import { useState } from "react"
import { rankTasks } from "../../utils/synpaseEngine"

export default function TodayMattersCard() {

    const {priorities, togglePriority, removePriority, mood, energy} = useDashboard()

    const [recentlyCompleted, setRecentlyCompleted] = useState([])

    const handleComplete=(id)=>{
        setRecentlyCompleted(
            prev=>[...prev, id]
        )
        togglePriority(id)

        setTimeout(() => {
            setRecentlyCompleted(prev=>
                prev.filter(
                    item => item!==id
                )
            )
        },1500)
    }

    const topTasks = rankTasks(priorities, mood, energy)
        .filter(task => !task.completed)
        .slice(0,3)

    return(
        <div className="bg-surface rounded-3xl p-8 border border-gray-800">
            <h3 className="text-xl font-semibold mb-6">
                🎯 Hoy importa
            </h3>

            <div className="space-y-4">
                {topTasks.map((task) => (
                    <div key={task.id}
                        className="group
                            flex
                            items-center
                            justify-between
                            bg-[#20242d]
                            rounded-2xl
                            p-4">

                        <div className="flex items-center gap-4">

                            <button onClick={() => handleComplete(task.id)} 
                                className={`w-8 h-8 rounded-full flex items-center justify-center
                                ${task.completed
                                ? "bg-primary"
                                : "border border-gray-600"
                            }`}>
                                {task.completed && <Check size={16}/>}
                            </button>

                            <p className={`transition-all
                                duration-500
                                ${recentlyCompleted.includes(task.id)
                                    ? "opacity-50 scale-95"
                                    : ""
                                }
                                ${task.completed
                                    ? "line-through opacity-40"
                                    : ""
                                }`}>
                                {task.text}
                            </p>

                        </div>

                        <button onClick={() => 
                            removePriority(task.id)
                        } className="opacity-30
                            hover:opacity-100
                            transition
                            text-gray-500
                            hover:text-red-500">
                                <Trash2 size={18}/>
                        </button>

                    </div>
                ))}
            </div>
        </div>
    )
}