import { Bell } from "lucide-react"
import { useState } from "react"
import { useNotification } from "../../context/NotificationContext"

const priorityColor = {
    high:"border-red-500/20",
    medium:"border-yellow-500/20",
    low:"border-cyan-500/20"
}

export default function NotificationCenter({
    isMobile
}){

    const {notificationQueue} = useNotification()

    const [showNotifications,setShowNotifications] = useState(false)

    return(
        <div className="
        absolute
        top-8
        right-10
        z-50">
            <button
            onClick={() => setShowNotifications(
                prev => !prev
            )}
            className="
            relative
            w-12
            h-12
            rounded-2xl
            border
            border-cyan-400/10
            bg-white/5
            backdrop-blur-xl
            hover:bg-white/10
            transition-all">
                <Bell size={20} strokeWidth={2.50}/>
                {
                    notificationQueue.length > 0 && (
                        <span className="
                        absolute
                        -top-2
                        -right-2
                        min-w-[22px]
                        h-[22px]
                        px-1
                        rounded-full
                        bg-red-500
                        text-[11px]
                        font-semibold
                        flex
                        items-center
                        justify-center">
                            {notificationQueue.length}
                        </span>
                    )
                }
            </button>

            {
                showNotifications && (
                    <div className={`
                    ${isMobile
                        ? `fixed
                        inset-0
                        w-full
                        h-full
                        rounded-none`
                        : `absolute
                        top-16
                        right-0
                        w-[380px]
                        rounded-3xl`
                    }
                    border
                    border-cyan-400/10
                    bg-slate-950/95
                    backdrop-blur-xl
                    p-5
                    overflow-y-auto
                    z-50`}>
                        <h3 className="
                        text-lg
                        font-semibold">
                            Notificaciones
                        </h3>
                        {
                            notificationQueue.length === 0 && (
                                <p className="
                                mt-4
                                text-white/50">
                                    No hay notificaciones.
                                </p>
                            )
                        }
                        {
                            notificationQueue.map(
                                (notification,index) => {
                                    return (
                                    <div
                                    key={index}
                                    className={`
                                    mt-4
                                    rounded-2xl
                                    border
                                    ${priorityColor[notification.priority]}
                                    bg-white/5
                                    p-4`}>
                                        <span className="
                                        text-xs
                                        text-cyan-300">
                                            {
                                                notification.type
                                                .toUpperCase()
                                            }
                                        </span>

                                        <p className="
                                        mt-1
                                        font-medium">
                                            {notification.title}
                                        </p>

                                        <p className="
                                        mt-2
                                        text-sm
                                        text-white/60">
                                            {notification.message}
                                        </p>
                                    </div>
                                )
                            }
                        )
                        }
                    </div>
                )
            }
        </div>
    )
}