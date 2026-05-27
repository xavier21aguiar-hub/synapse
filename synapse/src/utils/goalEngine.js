export function generateGoal(
    moodHistory=[],
    internalState={}
){
    
    const stressed=
    moodHistory.filter(
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
        stressed>=3
    ){  
        return{
            type:"recovery",
            message:"He decidido reducir tu carga mental"
        }
    }
    
    if(
        fatigued>=3
    ){
        return{
            type:"energy",
            message:"Mi prioridad será recuperar energía"
        }
    }
    
    if(
        energized>=3
    ){
        return{
            type:"momentum",
            message:"Quiero aprovechar este impulso"
        }
    }
    
    if(
        calm>=3
    ){
        return{
            type:"balance",
            message:"Intentaré mantener este equilibrio"
        }
    }
    return null
}