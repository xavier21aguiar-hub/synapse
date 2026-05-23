import MorningBriefCard from "../components/dashboard/MorningBriefCard"
import TodayMattersCard from "../components/dashboard/TodayMattersCard"
import AgendaCard from "../components/dashboard/AgendaCard"
import InsightCard from "../components/dashboard/InsightCard"
import BalanceCard from "../components/dashboard/BalanceCard"
import MoodCard from "../components/dashboard/MoodCard"
import EnergyCard from "../components/dashboard/EnergyCard"
import HabitCard from "../components/dashboard/HabitCard"
import HistoryCard from "../components/dashboard/HistoryCard"
import SynapseCore from "../components/dashboard/synapse/SynapseCore"

export default function Home() {

return(

<div className="space-y-8">
    <SynapseCore/>
    <MorningBriefCard/>

    <div className="grid md:grid-cols-2 gap-8">
        <TodayMattersCard/>
        <AgendaCard/>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        <MoodCard/>
        <EnergyCard/>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
        <HabitCard/>
        <HistoryCard/>
        <BalanceCard/>
    </div>

    <InsightCard/>
</div>

)
}