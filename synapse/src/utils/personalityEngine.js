export function evolvePersonality(
    moodHistory=[]
){
    const stressed=moodHistory.filter(
        m=>m==="stressed"
    ).length
    
    const fatigued=
    moodHistory.filter(
        m=>m==="fatigued"
    ).length
    
    const calm=    
    moodHistory.filter(
        m=>m==="calm"
    ).length
    
    const energized=
    moodHistory.filter(
        m=>m==="energized"
    ).length
    
    if(
        stressed>=2
        &&
        fatigued>=2
    ){
        return{
            type:"concerned",
            message:"He detectado esfuerzo sostenido recientemente"
        }
    }
    if(
        calm>=3
    ){
        return{
            type:"peaceful",
            message:"Tu ritmo reciente ha sido muy estable"
        }
    }
    if(
        energized>=3
    ){
        return{
            type:"motivated",
            message:"Percibo una etapa de alta energía"
        }
    }
    
    return null
}