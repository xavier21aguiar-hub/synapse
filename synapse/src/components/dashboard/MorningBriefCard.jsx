export default function MorningBriefCard() {

return (

<div className="bg-surface rounded-3xl p-8 border border-gray-800">

<div>

<p className="text-sm text-muted mb-2">

👋 Resumen matutino

</p>

<h2 className="text-3xl font-bold mb-6">

Buenos días, Xavier
</h2>

<p className="text-muted max-w-2xl leading-7">

Ayer completaste dos prioridades importantes y retomaste SQL después de varios días.

Detecté una mejor ventana de aprendizaje entre las 7–9 PM y prioricé trabajo profundo por la mañana.

</p>

<div className="mt-8 flex gap-4">

<button
className="
bg-primary
px-6
py-3
rounded-xl
font-medium
hover:opacity-90
transition
"
>

Comenzar día

</button>

<button
className="
bg-[#20242d]
px-6
py-3
rounded-xl
hover:bg-[#2a2e38]
transition
"
>

Ajustar plan

</button>

</div>

</div>

</div>

)

}