export default function Card({

children,
className=""

}){

return(
<div
className={`
    bg-surface
    rounded-3xl
    p-8
    border
    border-gray-800
${className}
`}
>
    {children}
</div>

)
}