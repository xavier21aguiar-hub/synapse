import {
    Home, 
    CheckSquare,
    Flame,
    Settings,
    Brain
} from "lucide-react"
import { Outlet } from "react-router-dom"
import QuickAddButton from "../components/ui/QuickAddButton"
import FeedbackToast from "../components/ui/FeedbackToast"

export default function MainLayout(){
    
    return(
    <div className="min-h-screen bg-background text-text">
        
        <div className="flex">
            
            {/* Sidebar */}
            <div className="w-20 bg-surface h-screen border-r border-gray-800">
                
                <div className="flex flex-col items-center py-8 gap-8">

                    {/* logo */}
                    <div className="mb-14">

                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                            <Brain size={26} className="text-primary" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-8 text-muted">
                        <Home className="hover:text-primary cursor-pointer transition"/>
                        <CheckSquare className="hover:text-primary cursor-pointer transition"/>
                        <Flame className="hover:text-primary cursor-pointer transition"/>
                        <Settings className="hover:text-primary cursor-pointer transition"/>
                    </div>

                </div>

            </div>
            
            {/* Main */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 xl:p-12 overflow-hidden">
                <Outlet/>
                <QuickAddButton/>
                <FeedbackToast/>
            </div>
        </div>
    </div>
    )
}