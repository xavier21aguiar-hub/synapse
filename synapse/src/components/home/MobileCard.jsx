export default function MobileCard({
    card
}){

    return(

        <div className="
        rounded-3xl

        border
        border-cyan-400/10

        bg-white/5

        backdrop-blur-xl

        p-5">

            <h3 className="
            text-lg
            font-semibold">

                {card.title}

            </h3>

            <p className="
            mt-3
            text-white/70">

                {card.content}

            </p>

        </div>

    )

}