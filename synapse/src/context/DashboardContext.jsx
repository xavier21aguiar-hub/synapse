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
import { getTransactions } from "../services/financeService"
import { getGoals } from "../services/goalService"
import { getPortfolioAssets} from "../services/portfolioService"
import { getHabits } from "../services/habitService"
import { getHabitLogs } from "../services/habitLogService"
import { saveHabit } from "../services/habitService"
import { saveHabitLog } from "../services/habitLogService"
import { getEvents,createEvent,updateEvent } from "../services/eventService"
import { getReminders,createReminder,updateReminder} from "../services/reminderService"

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

    const [transactions,setTransactions] = useState([])

    const [goals,setGoals] = useState([])

    const [portfolioAssets,setPortfolioAssets] = useState([])

    const [habitsData,setHabitsData] = useState([])

    const [habitLogs,setHabitLogs] = useState([])

    const [events,setEvents] = useState([])

    const [reminders,setReminders] = useState([])

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

    const completeHabit = async(habitId) => {
        try{
            await saveHabitLog({
                habit_id:habitId,

                completed_date: new Date()
                .toISOString()
                .split("T")[0]
            })
            await loadHabitLogs()
        }catch(error){
            console.error(error)
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

const loadTransactions = async() => {
    try{
        const data = 
        await getTransactions()

        setTransactions(data)
    }catch(error){
        console.error(error)
    }
}

const loadGoals = async() =>{
    try{
        const data = await getGoals()

        setGoals(data)
    }catch(error){
        console.error(error)
    }
}

const loadPortfolioAssets = async() => {
    try{
        const data = await getPortfolioAssets()

        setPortfolioAssets(data)
    }catch(error){
        console.error(error)
    }
}

const loadHabits = async() => {
    try{
        const data = await getHabits()

        setHabitsData(data)
    }catch(error){
        console.error(error)
    }
}

const loadHabitLogs = async() => {
    try{
        const data = await getHabitLogs()

        setHabitLogs(data)
    }catch(error){
        console.error(error)
    }
}

const createHabit = async(habit) => {
    try{
        await saveHabit(habit)
        await loadHabits()
    }catch(error){
        console.error(error)
    }
}

const loadEvents = async() => {
    try{
        const data = await getEvents()
        
        setEvents(data)
    }catch(error){
        console.error(error)
    }
}

const loadReminders = async() => {
    try{
        const data = await getReminders()

        setReminders(data)
    }catch(error){
        console.error(error)
    }
}

useEffect(() => {
    loadTransactions()
    loadGoals()
    loadPortfolioAssets()
    loadHabits()
    loadHabitLogs()
    loadEvents()
    loadReminders()
},[])

console.log("PROVIDER VALUE:",{
    priorities: dashboardPriorities,
    habits,
    mood,
    energy
})

const completedTasks = dashboardPriorities.filter(
    task => task.completed
)
const pendingTasks = dashboardPriorities.filter(
    task => !task.completed
)
const highPriorityPending = pendingTasks.filter(
    task => task.priority === "high"
)
const completionRate = dashboardPriorities.length
? Math.round(
    (
        completedTasks.length /
        dashboardPriorities.length
    ) * 100
)
: 0

const taskSummary = {
    completedToday:
    completedTasks.length,

    totalToday:
    dashboardPriorities.length,

    pending:
    pendingTasks.length,

    highPriorityPending:
    highPriorityPending.length,

    completionRate
}

const todayDate = new Date()
.toISOString()
.split("T")[0]

const todayDay = new Date()
.getDay()

const completedHabitsToday = habitLogs.filter(
    log => log.completed_date === todayDate
).length

const habitsForToday = habitsData.filter(
    habit => {
        if(
            habit.frequency_type === "daily"
        ){
            return true
        }

        if(
            habit.frequency_type === "weekly"
        ){
            return true
        }

        if(
            habit.frequency_type === "custom"
        ){
            const days = JSON.parse(
                habit.custom_days || "[]"
            )
            return days.includes(todayDay)
        }
        return false
    }
)

const habitSummary = {
    completedToday: completedHabitsToday,
    totalToday: habitsForToday.length,
    completionRate: habitsForToday.length

    ? Math.round(
        (
            completedHabitsToday /
            habitsForToday.length
        ) * 100
    )
    : 0
}

const income = transactions
.filter(t => t.type === "income")
.reduce((acc,t) => acc + t.amount, 0)
const expenses = transactions
.filter(t => t.type === "expense")
.reduce((acc,t) => acc + t.amount, 0)

const financeSummary = {
    income, 
    expenses,
    balance: 
    income - expenses
}

const todayEvents = events.filter(
    event => event.event_date === todayDate
)
const todayReminders = reminders.filter(
    reminder => reminder_date === todayDate
)
const pendingHabits = habitsForToday.filter(
    habit => {
        return !habitLogs.some(
            log => 
                log.habit_id === habit.id 
                &&
                log.completed_date === todayDate
        )
    }
)
const highPriorityTasks = dashboardPriorities.filter(
    task => !task.completed &&
    task.priority === "high"
)

const homeMessages = []
if(
    todayEvents.length > 0
){
    homeMessages.push(
        `Tienes ${
            todayEvents.length
        } evento${
            todayEvents.length > 1
            ? "s"
            : ""
        } programado${
            todayEvents.length > 1
            ? "s"
            : ""
        } hoy.`
    )
}
if(
    pendingHabits.length > 0
){
    homeMessages.push(
        `Aún faltan ${
            pendingHabits.length
        } hábito${
            pendingHabits.length > 1
            ? "s"
            : ""
        } por completar.`
    )
}
if(
    highPriorityTasks.length > 0
){
    homeMessages.push(
        `Tienes ${
            highPriorityTasks.length
        } tarea${
            highPriorityTasks.length > 1
            ? "s"
            : ""
        } prioritaria${
            highPriorityTasks.length > 1
            ? "s"
            : ""
        } pendiente${
            highPriorityTasks.length > 1
            ? "s"
            : ""
        }.`
    )
}
if(
    todayReminders.length > 0
){
    homeMessages.push(
        `Hay ${
            todayReminders.length
        } recordatorio${
            todayReminders.length > 1
            ? "s"
            : ""
        } para hoy.`
    )
}
const homeInsight = homeMessages.length
? homeMessages.join(" ")
: "Tu día luce tranquilo."

const addEvent = async(eventData) => {
    try{
        const newEvent = await createEvent(
            eventData
        )

        setEvents(
            prev => [
                ...prev,
                newEvent
            ]
        )
    }catch(error){
        console.log(error)
    }
}

const addReminder = async(reminderData) => {
    try{
        const newReminder = await createReminder(
            reminderData
        )

        setReminders(
            prev => [
                ...prev,
                newReminder
            ]
        )
    }catch(error){
        console.log(error)
    }
}

const timelineItems = [
    ...dashboardPriorities.map(
        task => ({
            type: "task",
            id: task.id,
            title: task.text,
            date: null,
            time: null,
            completed: task.completed
        })
    ),

    ...events.map(
        event => ({
            type: "event",
            id: event.id,
            title: event.title,
            date: event.event_date,
            time: event.event_time,
            completed: event.completed
        })
    ),

    ...reminders.map(
        reminder => ({
            type: "reminder",
            id: reminder.id,
            title: reminder.title,
            date: reminder.reminder_date,
            time: reminder.reminder_time,
            completed: reminder.completed
        })
    ),
]

const toggleEvent = async(id)=> {
    try{
        const updated = await updateEvent(id)

        setEvents(prev =>
            prev.map(
                event => event.id === id
                ? updated
                : event
            )
        )
    }catch(error){
        console.log(error)
    }
}

const toggleReminder = async(id)=> {
    try{
        const updated = await updateReminder(id)

        setReminders(prev =>
            prev.map(
                reminder => reminder.id === id
                ? updated
                : reminder
            )
        )
    }catch(error){
        console.log(error)
    }
}

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
        setMoodHistory,
        transactions,
        loadTransactions,
        goals,
        loadGoals,
        portfolioAssets,
        loadPortfolioAssets,
        habitsData,
        loadHabits,
        habitLogs,
        loadHabitLogs,
        createHabit,
        completeHabit,
        taskSummary,
        habitSummary,
        financeSummary,
        events,
        reminders,
        loadEvents,
        loadReminders,
        addEvent,
        addReminder,
        timelineItems,
        toggleEvent,
        toggleReminder,
        habitsForToday,
        homeInsight
    }}>
        {children}
    </DashboardContext.Provider>
    )
}

export const useDashboard=()=>{
    return useContext(DashboardContext)
}