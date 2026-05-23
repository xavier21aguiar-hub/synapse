export function detectPattern(habits){
    const { sleep, study, work } = habits

    if(
        study >= sleep + 3
    ){
        return "📚 Detecté una carga fuerte de estudio. Considera descansar."
    }
    if(
        work >= sleep + 3
    ){
        return "💼 Mucho trabajo acumulado. Cuidado con fatiga."
    }
    if(
        sleep >= study && sleep >= work
    ){
        return "😴 Buen equilibrio. Has priorizado recuperación."
    }
    
    return "✨ Patrón estable detectado."
}