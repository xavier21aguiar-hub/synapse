export function generateReaction(intent){
    switch(intent){
        case "fatigued":
            return{
                thought: "Detecté baja energía",
                speech: "Percibo cansancio. Tal vez deberías descansar un poco."
            }

        case "stressed":
            return{
                thought: "Carga mental elevada",
                speech: "He detectado tensión continua. Respira un momento."
            }

        case "energized":
            return{
                thought: "Energía detectada",
                speech: "Tu energía es alta. Aprovechémosla."
            }

        case "calm":
            return{
                thought: "Estado estable",
                speech: "Percibo tranquilidad."
            }

        default:
            return null
    }
}