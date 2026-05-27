export function rememberConversation(
    history,message
){
    return [
        ...history.slice(-5),
        message
    ]
}

export function analyzeConversation(
    history=[]
){
    if(
        !Array.isArray(history)
    ){
        return null
    }
    
    const text=
    history
    .join(" ")
    .toLowerCase()
    
    if(
        text.includes(
            "cansado"
        )
        &&
        text.includes(
            "trabajo"
        )
    ){
        return(
            "He notado cansancio y carga laboral"
        )
    }
    
    if(
        text.includes(
            "estres"
        )
        &&
        text.includes(
            "mucho"
        )
    ){
        return(
            "La presión parece acumularse"
        )
    }
    return null
}