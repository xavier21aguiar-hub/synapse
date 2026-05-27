import { useEffect, useState } from "react"

export default function useMicrophoneLevel() {
    const [volume, setVolume] = useState(0)

    useEffect(() => {
        let analyser
        let dataArray
        let animationId

        async function startMic() {
            try{
                if(
                    !navigator?.mediaDevices
                    ?.getUserMedia
                ){
                    console.log(
                        "Micrófono no soportado"
                    )
                    return
                }

                const stream = await navigator
                .mediaDevices
                .getUserMedia({
                    audio: true
                })

                const audioContext = new (
                    window.AudioContext || window.webkitAudioContext
                )()

                analyser = audioContext.createAnalyser()

                const microphone = audioContext.createMediaStreamSource(
                    stream
                )

                microphone.connect(
                    analyser
                )

                analyser.fftSize = 256

                dataArray = new Uint8Array(
                    analyser.frequencyBinCount
                )

                const update = () => {
                    analyser
                    .getByteFrequencyData(
                        dataArray
                    )

                    const avg = dataArray.reduce(
                        (a,b)=>a+b, 
                        0
                    )
                    /
                    dataArray.length

                    const noiseGate=25
                    const cleanVolume=
                    avg>noiseGate
                    ? avg-noiseGate
                    : 0

                    setVolume(prev=>prev*.8
                        +
                        cleanVolume*.2
                    )

                    animationId = requestAnimationFrame(
                        update
                    )
                }
                update()
            }
            catch(error){
                console.log(
                    "Micro error:",error
                )
            }
        }

        startMic()

        return() => {
            cancelAnimationFrame(
                animationId
            )
        }
    },[])
    return volume
}