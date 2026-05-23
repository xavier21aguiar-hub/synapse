export default function AgendaCard() {

    const events= [
        {
            hour: "10:00",
            title: "Reunión equipo"
        },
        {
            hour: "13:00",
            title: "Revisar API"
        },
        {
            hour: "19:00",
            title: "Práctica SQL"
        }
    ]

    return(
        <div className="bg-surface rounded-3xl p-8 border border-gray-800">
            <h3 className="text-xl font-semibold mb-6">
                📅 Agenda
            </h3>

            <div className="space-y-4">
                {events.map((event,index) => (

                    <div key={index} className="flex items-center justify-between bg-[#20242d] rounded-2xl p-4">

                        <div>
                            <p className="font-medium">
                                {event.title}
                            </p>
                        </div>

                        <p className="text-muted text-sm">
                            {event.hour}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}