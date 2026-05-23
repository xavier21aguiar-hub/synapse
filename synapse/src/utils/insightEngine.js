export function generateInsight(habits, energy, mood){

    if(habits.study > habits.sleep +2
    ){
        return "🧠 Detecté mucho estudio. Considera descansar."
    }
    if(energy < 40 
    ){
        return "⚡ Energía baja. Hoy evita tareas pesadas."
    }
    if(mood==="fatigued"
    ){
        return "😵 Pareces cansado. Prioricé recuperación."
    }

    return "✨ Ritmo equilibrado."
}