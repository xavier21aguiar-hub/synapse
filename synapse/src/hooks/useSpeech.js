import { useEffect, useState } from "react"

export default function useSpeech() {
    const [transcript, setTranscript] = useState("")

    useEffect(()=>{
        const SpeechRecognition=
        window.SpeechRecognition
        ||
        window.webkitSpeechRecognition

        if(
            !SpeechRecognition
        ){
            console.log(
                "Speech no soportado"
            )
            return
        }

        const recognition=
        new SpeechRecognition()

        recognition.continuous=true

        recognition.lang="es-MX"

        recognition.interimResults=true

        recognition.onresult=
        (event)=>{
            const text=
            Array.from(event.results)

            .map(r=>
                r[0].transcript
            )

            .join("")

            const fixedText=
            text

            .replaceAll(/sinapsis/gi,"Synapse")
            .replaceAll(/sinapsi/gi,"Synapse")
            .replaceAll(/sinapcis/gi,"Synapse")
            .replaceAll(/sinaps/gi,"Synapse")
            
            setTranscript(
                fixedText
            )
        }
        recognition.start()

        return()=>{
            recognition.stop()
        }
    },[])
    return transcript
}