export function detectMood(
    tasks,
    habits,
    energy
){

    const currentHour=
    new Date().getHours()

    const completed=
    tasks.filter(
        task=>task.completed
    )

    const completedCount=
    completed.length


    let effort=0

    completed.forEach(task=>{

        const text=
        task.text
        .toLowerCase()

        // trabajo pesado
        if(
            text.includes("sql")||
            text.includes("pipeline")||
            text.includes("curso")||
            text.includes("aprender")
        ){
            effort+=2
        }

        // recuperación
        if(
            text.includes("dormir")||
            text.includes("descanso")||
            text.includes("caminar")||
            text.includes("comer")
        ){
            effort-=1
        }
    })

    // noche muy tarde
    if(
        currentHour>=23
        &&
        energy<60
    ){
        return "fatigued"
    }

    // estrés
    if(
        effort>=6
        &&
        habits.sleep<2
    ){
        return "stressed"
    }

    // energía muy baja
    if(
        energy<40
    ){
        return "fatigued"
    }

    // alta energía
    if(
        energy>85
    ){
        return "energized"
    }

    // relajado
    if(
        habits.sleep>=3
        &&
        energy>60
    ){
        return "calm"
    }

    return "good"
}