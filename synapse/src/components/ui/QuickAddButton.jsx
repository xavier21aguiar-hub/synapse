import {Plus,X} from "lucide-react"
import { useState } from "react"
import { useDashboard } from "../../context/DashboardContext"
import { useLocation } from "react-router-dom"
import { saveTransaction } from "../../services/financeService"

export default function QuickAddButton() {

    const [open,setOpen] = useState(false)

    const [task,setTask] = useState("")
    const [priority, setPriority] = useState(2)
    const {addPriority, loadTransactions,createHabit} = useDashboard()

    const handleAdd = () => {
        if(!task.trim()) return

        addPriority(task,priority)
        setTask("")
        setOpen(false)
    }

    const location = useLocation()
    const isFinance = location.pathname === "/finance"
    const isHabits = location.pathname === "/habits"
    

    const [habitIcon,setHabitIcon] = useState("📚")

    const [amount,setAmount] = useState("")
    const [category,setCategory] = useState("Comida")
    const [successMessage,setSuccessMessage] = useState("")

    const handleSaveTransaction = async(
        type
    ) => {
        try{
            if(!task.trim()) return

            if(!amount || Number(amount) <= 0)
                return
            
            await saveTransaction({
                user_id:"00000000-0000-0000-0000-000000000001",
                type,
                amount:Number(amount),
                category,
                description:task,
                transaction_date:new Date()
                .toISOString()
                .split("T")[0]
            })
            await loadTransactions()
            setSuccessMessage(
                type === "expense"
                ? "💸 Gasto registrado"
                : "💰 Ingreso registrado"
            )
            setTask("")
            setAmount("")
            
            setTimeout(() => {
                setOpen(false)
                setSuccessMessage("")
            },1500)
        }catch(error){
            console.error(error)
        }
    }

    const [habitName,setHabitName] = useState("")
    const [frequencyType,setFrequencyType] = useState("daily")
    const [frequencyDays,setFrequencyDays] = useState([])

    const handleHabit = async() => {
        if(!habitName.trim())
            return

        await createHabit({
            user_id: "00000000-0000-0000-0000-000000000001",
            name: habitName,
            icon: "🎯",
            frequency_type: frequencyType,
            frequency_days: frequencyDays
        })
        setHabitName("")
        setFrequencyType("daily")

        setFrequencyDays([])

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

                    {
                        isFinance ? (
                            <>
                            <input value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Descripción"
                            className="
                            w-full
                            bg-[#20242d]
                            rounded-xl
                            p-4
                            outline-none"/>

                            <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Monto"
                            className="
                            w-full
                            mt-5
                            bg-[#20242d]
                            rounded-xl
                            p-4
                            outline-none"/>

                            <select 
                            value={category}
                            onChange={(e)=>
                                setCategory(e.target.value)
                            }
                            className="
                            w-full
                            mt-5
                            bg-[#20242d]
                            rounded-xl
                            p-4
                            outline-none">
                                <option>
                                    Comida
                                </option>
                                <option>
                                    Transporte
                                </option>
                                <option>
                                    Gasolina
                                </option>
                                <option>
                                    Casa
                                </option>
                                <option>
                                    Ocio
                                </option>
                            </select>
                            </>
                        ) : isHabits ? (
                            <>
                            <input
                            value={habitName}
                            onChange={(e)=> setHabitName(
                                e.target.value
                            )}
                            placeholder="Nombre del hábito"
                            className="
                            w-full
                            bg-[#20242d]
                            rounded-xl
                            p-4
                            outline-none"/>

                            <div className="
                            flex
                            gap-2
                            mt-4
                            flex-wrap">
                                {
                                    ["📚","🏋️","🧘","💧","🏃","🎸"]
                                    .map(icon => (
                                        <button
                                        key={icon}
                                        onClick={() => setHabitIcon(icon)}
                                        className={`
                                        w-12
                                        h-12
                                        rounded-xl
                                        transition-all
                                        ${
                                            habitIcon === icon
                                            ? "bg-primary"
                                            : "bg-[#20242d]"
                                        }`}>
                                            {icon}
                                        </button>
                                    ))
                                }
                            </div>

                            <select
                            value={frequencyType}
                            onChange={(e) => setFrequencyType(e.target.value)}
                            className="
                            w-full
                            mt-4
                            bg-[#20242d]
                            rounded-xl
                            p-4
                            outline-none">
                                <option value="daily">
                                    Diario
                                </option>
                                
                                <option value="weekly">
                                    Semanal
                                </option>
                            </select>
                            </>
                        ) : (
                            <>
                            <input value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Descripción"
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
                        </>
                        )
                    }

                    {
                        isFinance ? (
                            <div className="flex gap-3 mt-5">
                                <button 
                                onClick={()=>
                                    handleSaveTransaction("expense")
                                }  
                                className="
                                flex-1
                                bg-[#20242d]
                                py-3
                                rounded-xl
                                transition-all
                                duration-300
                                hover:bg-primary
                                hover:scale-[1.02]">
                                    💸 Gasto
                                </button>

                                <button
                                onClick={()=>
                                    handleSaveTransaction("income")
                                } 
                                className="
                                flex-1
                                bg-[#20242d]
                                py-3
                                rounded-xl
                                transition-all
                                duration-300
                                hover:bg-primary
                                hover:scale-[1.02]">
                                    💰 Ingreso
                                </button>
                            </div>
                        ) : isHabits ?(
                            <button
                            onClick={handleHabit}
                            className="
                            w-full
                            mt-5
                            bg-primary
                            py-3
                            rounded-xl
                            transition-all
                            duration-300
                            hover:scale-[1.02]">
                                {habitIcon} Crear hábito
                            </button>
                        ) : (
                            <div className="flex gap-3 mt-5">
                                <button onClick= {handleAdd} className="flex-1 bg-primary py-3 rounded-xl">
                                    + Tarea
                                </button>
                                    
                                <button className="flex-1 bg-[#20242d] py-3 rounded-xl">
                                    + Hábito
                                </button>
                            </div>
                        )
                    }

                    {
                    successMessage && (
                    <p className="
                    mt-4
                    text-green-400
                    text-sm
                    text-center">
                        {successMessage}
                    </p>
                )
                }
            </div>
        )}
    </>
    )
}