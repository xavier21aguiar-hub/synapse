export function detectIntent(text){

    const input=
    text.toLowerCase()

    const intents=[

    {
        keywords:[
        "cansado",
        "agotado",
        "sin energía",
        "desvelado",
        "muy cansado"
        ],
        action:"fatigued"
    },
    {
        keywords:[
        "estresado",
        "presionado",
        "mucho trabajo",
        "ansioso",
        "estres"
        ],
        action:"stressed"
    },
    {
        keywords:[
        "feliz",
        "muy bien",
        "genial",
        "motivado"
        ],
        action:"energized"
    },
    {
        keywords:[
        "tranquilo",
        "relajado",
        "en paz"
        ],
        action:"calm"
    }
]

for(
    const intent
    of intents
){
    
    const found=
    
    intent.keywords.some(
        word=>
            
            input.includes(
                word
            )
        )
        
        if(
            found
        ){
            return intent.action
        }
    }
    return null
}