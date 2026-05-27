import {
createContext,
useContext,
useEffect,
useState
} from "react"
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService"
import { detectMood } from "../utils/moodEngine"
import { detectHabits } from "../utils/habitEngine"
import { generateInsight } from "../utils/insightEngine"
import { detectPattern } from "../utils/patternEngine" 
import { saveHistory } from "../services/historyService"
import { predictNext } from "../utils/predictEngine"
import { rememberConversation, analyzeConversation } from "../utils/conversationMemory"
import { updateInternalState } from "../utils/internalStateEngine"

const DashboardContext=createContext()

export function DashboardProvider({
    
    children

}){
    
    const [dashboardPriorities,setPriorities]=useState([])

    const [message, setMessage] = useState("")

    const [mood,setMood] = useState("good")

    const [energy,setEnergy] = useState(100)

    const [habits, setHabits] = useState({
        sleep: 0, study: 0, work: 0
    })

    const [internalState, setInternalState]= useState({
        energy:80,
        stress:20,
        focus:50,
        social:50,
        curiosity:70
    })

    const [insight, setInsight] = useState("")

    const [pattern, setPattern] = useState("")

    const [prediction, setPrediction] = useState("")

    const [historyRefresh, setHistoryRefresh] = useState(0)

    const [moodHistory, setMoodHistory] = useState([])

    const [conversationHistory,setConversationHistory] = useState(()=>{
        const saved=
        localStorage.getItem(
            "synapse-memory"
        )

        return saved
        ? JSON.parse(saved)
        : []
    })

    useEffect(()=>{
        localStorage.setItem(
            "synapse-memory",
            JSON.stringify(
                conversationHistory
            )
        )
    },[conversationHistory])

    useEffect(() => {
        loadTasks()
    },[])

    useEffect(()=>{
        setInternalState(
            prev=>
                updateInternalState(
                    prev,
                    dashboardPriorities,
                    habits
                )
        )
    },[dashboardPriorities,habits])

    const loadTasks=async()=>{
        
        try{
            const data = await getTasks()
            
            setPriorities(data)

            let energy = 100
            data
            .filter(task => task.completed)
            .forEach(task => {
                const text = task.text.toLowerCase()

                //Tareas pesadas 
                if(
                    text.includes("sql") ||
                    text.includes("pipeline") ||
                    text.includes("aprender") ||
                    text.includes("curso")
                ){
                    energy -= 15
                }

                //Recuperacion
                if(
                    text.includes("descanso") ||
                    text.includes("dormir") ||
                    text.includes("caminar") ||
                    text.includes("comer")
                ){
                    energy += 10
                }
            })
            const finalEnergy = Math.max(
                Math.min(
                    energy, 100
                ), 20
            )
            setEnergy(finalEnergy)

            const habitsData = detectHabits(data)
            setHabits(habitsData)

            const detectedMood = detectMood(
                data,
                habitsData,
                finalEnergy
            )
            setMood(detectedMood)

            setMoodHistory(prev => [
                ...prev.slice(-8), detectedMood
            ])

            setPattern(detectPattern(habitsData))

            const history = JSON.parse(
                localStorage.getItem(
                    "synapseHistory"
                )
            ) || []

            setPrediction(predictNext(history))

            setInsight(
                generateInsight(
                    habitsData, finalEnergy, detectMood
                )
            )

        } catch(error){
            console.log(error)
        }
    }
    
    const addPriority=async(task, priority)=>{
        
        if(!task.trim()) return
        
        const alreadyExists = dashboardPriorities.some(
            item => item.text
            .toLowerCase()
            .trim() === task
            .toLowerCase()
            .trim()
            &&
            !item.completed
        )

        if(alreadyExists){
            setMessage(
                "🧠 Ya tengo esa tarea registrada"
            )
            setTimeout(()=>{
                setMessage("")
            },3000)
            return
        }
        
        try{
            const newTask={
                text:task,
                completed:false,
                priority
            }
            
            await createTask(newTask)

            await loadTasks()

            setMessage("✨ Registrada. Synapse decidirá cuándo mostrarla")
            setTimeout(() => {
                setMessage("")
            },3000)
        } catch(error){
            console.log(error)
        }
    }

const togglePriority=async(id)=>{
    try{
        const task = dashboardPriorities.find(
            t => t.id === id
        )
        if(
            task && !task.completed
        ){
            saveHistory(task)
        }
        await updateTask(id)
        await loadTasks()

        setHistoryRefresh(
            prev => prev + 1
        )

    } catch(error){
        console.log(error)
    }
}

const removePriority=async(id)=>{
    try{
        await deleteTask(id)
        await loadTasks()
    } catch(error){
        console.log(error)
    }
}

console.log("PROVIDER VALUE:",{
    priorities: dashboardPriorities,
    habits,
    mood,
    energy
})

return(
    <DashboardContext.Provider
    
    value={{
        priorities: dashboardPriorities,
        addPriority,
        togglePriority,
        removePriority,
        message,
        mood, setMood,
        energy, setEnergy,
        habits,
        internalState,
        conversationHistory,
        setConversationHistory,
        insight,
        pattern,
        historyRefresh,
        moodHistory,
        setMoodHistory
    }}>
        {children}
    </DashboardContext.Provider>
    )
}

export const useDashboard=()=>{
    return useContext(DashboardContext)
}