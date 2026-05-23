import { useDashboard } from "../../context/DashboardContext"

export default function MoodCard(){
    const{
        mood,
        setMood
    } = useDashboard()

    return(
        <div className="
        bg-surface
        rounded-3xl
        p-6
        border border-gray-800">
            <p className="mb-4 text-primary">
                🧠 Estado actual
            </p>

            <select value={mood}
            onChange={(e)=>
                setMood(e.target.value)
            }
            className="w-full
            bg-[#20242d]
            rounded-xl
            p-4">
                <option value="good">
                    🙂 Bien
                </option>
                <option value="fatigued">
                    😵 Fatigado
                </option>
                <option value="stressed">
                    😤 Estresado
                </option>
                <option value="calm">
                    😌 Tranquilo
                </option>
            </select>
        </div>
    )
}