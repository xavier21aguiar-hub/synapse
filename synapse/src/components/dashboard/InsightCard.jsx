import { useDashboard } from "../../context/DashboardContext"

export default function InsightCard() {

    const {insight, pattern, prediction} = useDashboard()

    return (
        <div className="bg-surface rounded-3xl p-8 border border-gray-800">
            <h3>
                🧠 Synapse Insight
            </h3>

            <div className="space-y-4 mt-5">
                <p>
                    {insight}
                </p>

                <p className="opacity-70">
                    {pattern}
                </p>

                <p className="opacity-60">
                    {prediction}
                </p>
            </div>
        </div>
    )
}