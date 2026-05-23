import { useDashboard } from "../../context/DashboardContext"

export default function EnergyCard(){

const {energy}=useDashboard()

return(
    <div className="
    bg-surface
    rounded-3xl
    p-6
    border border-gray-800">
        
        <p className="mb-4 text-primary">
            ⚡ Energía
        </p>
        
        <div className="bg-[#20242d]
        rounded-full
        h-4">
            
            <div
            style={{width:`${energy}%`}}
            className="
            h-4
            rounded-full
            bg-primary
            transition-all
            duration-700"/>

        </div>
    
        <p className="mt-3 text-sm">
            {energy}%
        </p>
    </div>
)
}