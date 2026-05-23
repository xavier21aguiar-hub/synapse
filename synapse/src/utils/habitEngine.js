export function detectHabits(tasks){
    const completed = tasks.filter(task =>
        task.completed
    )

    const stats = {
        sleep: 0,
        study: 0,
        work: 0
    }

    completed.forEach(task => {
        const text = 
        task.text.toLowerCase()

        console.log(task.text,stats)

        if(
            text.includes("dormir") ||
            text.includes("descanso")
        ){
            stats.sleep ++
        }
        if(
            text.includes("aprender") ||
            text.includes("curso")
        ){
            stats.study ++
        }
        if(
            text.includes("sql") ||
            text.includes("pipeline") ||
            text.includes("ticket")
        ){
            stats.work ++
        }
    })
    return stats
}