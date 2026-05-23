import { useDashboard } from "../../context/DashboardContext"

export default function FeedbackToast() {
    const {message} = useDashboard()

    if(!message) return null

    return(
        <div className="fixed
            top-8
            right-8
            bg-[#20242d]
            border
            border-yellow-500
            px-6
            py-4
            rounded-2xl
            shadow-xl
            z-50">
                <p>
                    {message}
                </p>
            </div>
    )
}