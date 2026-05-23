export function rankTasks(tasks, mood,energy){

    const currentHour=new Date().getHours()

    return [...tasks]

    .map(task=>{

        let score=task.priority*10

        const text=task.text.toLowerCase()

        // aprendizaje pesado noche
        if(
            currentHour>=21 &&
            (
            text.includes("sql") ||
            text.includes("estudiar") ||
            text.includes("aprender") ||
            text.includes("curso")
            )
        ){
            score-=8
        }

        // descanso noche
        if(
            currentHour>=21 &&
            (
            text.includes("descanso") ||
            text.includes("dormir")
            )
        ){
            score+=5
        }

        // trabajo mañana
        if(
            currentHour<=12 &&
            text.includes("pipeline")
        ){
            score+=4
        }

        if(mood==="fatigued"){
            
            if(text.includes("sql") || text.includes("aprender")
            ){
                score-=10
            }
            if(text.includes("descanso") || text.includes("dormir")
            ){
                score+=8
            }
        }

        if(energy<40){
            if(
                text.includes("sql") ||
                text.includes("pipeline") ||
                text.includes("aprender") 
            ){
                score -= 12
            }
            if(
                text.includes("descanso") ||
                text.includes("dormir") ||
                text.includes("caminar") 
            ){
                score += 8
            }
        }

        return{
            ...task,
            synapseScore:score
        }
    })

    .sort(
        (a,b)=>
        b.synapseScore-a.synapseScore
    )
}