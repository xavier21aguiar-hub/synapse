import Card from "../ui/Card"

const stats = [
    {
        label: "Trabajo",
        blocks: 4
    },
    {
        label: "Aprendizaje",
        blocks: 3
    },
    {
        label: "Descanso",
        blocks: 2
    }
]

export default function BalanceCard() {
    return(
        <Card>
            <p className="text-sm text-primary mb-3">
                ⚖️ Balance semanal
            </p>

            <h3 className="text-xl font-semibold mb-8">
                Tu equilibrio actual 
            </h3>

            <div className="grid md:grid-cols-2 gap-8 items-start">

                {/* izquierda */}
                <div className="space-y-6">
                {stats.map((item,index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span>
                            {item.label}
                        </span>

                        <div className="flex gap-1">
                            {[...Array(6)].map((_,i) => (

                                <div key={i} className={`w-8 h-2 rounded-full
                                    ${i<item.blocks
                                    ? "bg-primary"
                                    : "bg-[#20242d]"}`}>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>

                {/* derecha */}
                <div className="bg-[#20242d] rounded-2xl p-6 border border-gray-700">

                    <p className="text-primary text-sm mb-3">
                        🧠 Observación Synapse
                    </p>

                    <p className="text-muted leading-7">
                        Esta semana priorizaste trabajo sobre descanso.
                        Mañana podría ser buen momento para recuperar energía.
                    </p>

                </div>
            </div>
        </Card>
    )
}