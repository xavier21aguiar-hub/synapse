import { createContext,useContext } from "react";
import { useBrain } from "./BrainContext";
import { useDashboard } from "./DashboardContext";

const NotificationContext = createContext()

export function NotificationProvider ({
    children
}) {
    const{
        brainAnalysis,
        brainInsight
    } = useBrain()

    const{events,reminders,dashboardPriorities,habitLogs,habitsForToday} = useDashboard()

    const notificationQueue = []

    const now = new Date()

    events.forEach(event => {
        if(
            !event.event_time
        ) return

        const [hours,minutes] = event.event_time
        .split(":")
        .map(Number)

        const eventDate = new Date()
        eventDate.setHours(hours,minutes,0,0)

        const diffMinutes = (
            eventDate - now
        ) / 60000

        if(
            diffMinutes > 0 &&
            diffMinutes <= 30
        ){
            notificationQueue.push({
                type: "event",
                priority: "high",
                title:"Evento próximo",
                message:`${event.title} comienza en menos de 30 minutos.`
            })
        }
    })

    reminders.forEach(reminder => {
        if(
            !reminder.reminder_time
        ) return
        
        const [hours,minutes] = reminder.reminder_time
        .split(":")
        .map(Number)

        const reminderDate = new Date()

        reminderDate.setHours(hours,minutes,0,0)

        const diffMinutes = (
            reminderDate - now
        ) / 60000
        
        if(
            diffMinutes > 0 &&
            diffMinutes <=10
        ){
            notificationQueue.push({
                type: "reminder",
                priority: "medium",
                title: "Recordatorio",
                message: reminder.title
            })
        }
    })

    const todayReminders = reminders.filter(
        reminder => !reminder.reminder_time
    )
    if(
        todayReminders.length > 0
    ){
        notificationQueue.push({
            type: "reminder",
            priority: "low",
            title: "Pendientes del día",
            message: `Tienes ${
                todayReminders.length
            } recordatorio${
                todayReminders.length > 1
                ? "s"
                : ""
            } sin horario definido`
        })
    }

    if(
        brainAnalysis.stress > 80
    ){
        notificationQueue.push({
            type: "wellbeing",
            priority: "high",
            title: "Pausa sugerida",
            message: "Tu carga actual es elevada. Considera tomar un descanso."
        })
    }

    const pendingHabits = habitsForToday.filter(
        habit => {
            return !habitLogs.some(
                log => log.habit_id === habit.id
            )
        }
    )

    if(
        pendingHabits.length > 0
    ){
        notificationQueue.push({
            type: "habit",
            priority: "medium",
            title: "Hábitos pendientes",
            message: `Aún faltan ${
                pendingHabits.length
            } hábito${
                pendingHabits.length > 1
                ? "s"
                : ""
            } por completar.`
        })
    }

    const value = {
        notificationQueue
    }

    return(
        <NotificationContext.Provider
        value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotification(){
    return useContext(
        NotificationContext
    )
}