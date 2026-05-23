import {Plus,X} from "lucide-react"
import { useState } from "react"
import { useDashboard } from "../../context/DashboardContext"

export default function QuickAddButton() {

    const [open,setOpen] = useState(false)

    const [task,setTask] = useState("")
    const [priority, setPriority] = useState(2)
    const {addPriority} = useDashboard()

    const handleAdd = () => {
        if(!task.trim()) return

        addPriority(task,priority)
        setTask("")
        setOpen(false)
    }
    
    return(

    <>

        <button onClick={() => setOpen(!open)}
        className="fixed 
        bottom-8 
        right-8 
        w-16 
        h-16
        rounded-full
        bg-primary
        flex
        items-center
        justify-center
        shadow-lg
        hover:scale-110
        hover:opacity-90
        transition
        duration-300">

            {open 
                ? <X size={26}/>
                : <Plus size={28}/>
            }   

        </button>

        {open && (
            <div className="
                fixed
                bottom-28
                right-8
                w-80
                bg-surface
                border
                border-gray-800
                rounded-3xl
                p-6
                shadow-2xl">
                    <p className="text-primary text-sm mb-4">
                        ⚡ Agregar rápido
                    </p>

                    <input value={task}
                        onChange={(e) => setTask(
                            e.target.value
                        )}
                        placeholder="¿Qué necesitas recordar?"
                        className="
                        w-full
                        bg-[#20242d]
                        rounded-xl
                        p-4
                        outline-none
                        border
                        border-transparent
                        focus:border-primary"/>

                    <select value={priority}
                        onChange={(e) =>
                            setPriority(
                                Number(e.target.value)
                            )
                        } className="
                        w-full
                        mt-4
                        bg-[#20242d]
                        rounded-xl
                        p-4
                        outline-none">
                            <option value={3}>
                                🔴 Alta
                            </option>
                            <option value={2}>
                                🟡 Media
                            </option>
                            <option value={1}>
                                🟢 Baja
                            </option>
                        </select>

                    <div className="flex gap-3 mt-5">
                        <button onClick= {handleAdd} className="flex-1 bg-primary py-3 rounded-xl">
                            + Tarea
                        </button>

                        <button className="flex-1 bg-[#20242d] py-3 rounded-xl">
                            + Hábito
                        </button>
                    </div>
                </div>
        )}
    </>
    )
}