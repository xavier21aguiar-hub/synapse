export function predictNext(history){

    if(!history.length){

        return "✨ Aún estoy aprendiendo sobre ti"
    }

    const stats={
        sleep:0,
        study:0,
        work:0
    }

    history.forEach(item=>{

        const text = item.text
        .toLowerCase()

        if(
            text.includes("dormir") ||
            text.includes("descanso")
        ){
            stats.sleep++
        }

        if(
            text.includes("sql") ||
            text.includes("aprender")
        ){
            stats.study++
        }

        if(
            text.includes("pipeline") ||
            text.includes("ticket")
        ){
            stats.work++
        }
    })

    if(
        stats.study > stats.sleep
        &&
        stats.study > stats.work
    ){
        return "📚 Detecté tendencia de aprendizaje reciente"
    }

    if(
        stats.sleep > stats.study
    ){
        return "😴 Detecté necesidad frecuente de recuperación"
    }

    return "💼 Detecté actividad enfocada en trabajo"
}