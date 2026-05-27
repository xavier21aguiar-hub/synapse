export function remember(history,newItem){
    return[
        ...history.slice(-5),
        newItem
    ]
}

export function analyzeMemory(history){
    const stressed=
    history.filter(
        x=>
            x==="stressed"
    ).length

    const tired=
    history.filter(
        x=>
            x==="fatigued"
    ).length

    if(
        stressed>=3
        &&
        tired>=2
    ){
        return "Detecto esfuerzo sostenido"
    }

    return null 
}