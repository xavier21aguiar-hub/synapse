import {useEffect,useState} from "react"
import { getHistory } from "../../services/historyService"
import { useDashboard } from "../../context/DashboardContext"

export default function HistoryCard(){
    const [history, setHistory] = useState([])

    const {historyRefresh} = useDashboard()
    
    useEffect(()=>{
        loadHistory()
    },[historyRefresh])

    const loadHistory = async() => {
        try{
            const data = await getHistory()

            setHistory(data)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
    <div className="
    bg-surface
    rounded-3xl
    p-6
    border border-gray-800">
        
        <p className="mb-4">
            📜 Historial reciente
        </p>

    <div className="space-y-3">
        {history.map(
            (item,index)=>(
            
            <p key={index}>
                {item.text}
            </p>
            )
        )}
    </div>
</div>
)
}