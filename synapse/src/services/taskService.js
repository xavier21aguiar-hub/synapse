import axios from "axios"

const API="http://127.0.0.1:8000"


export const getTasks=async()=>{
    
    const response= await axios.get( `${API}/tasks` )
    
    return response.data
}

export const createTask=async(task)=>{
    
    const response= await axios.post(
        
        `${API}/tasks`,
        task
    ) 
    
    return response.data
}

export const updateTask=async(id)=>{
    const response=await axios.patch(
        `${API}/tasks/${id}`
    )
    return response.data
}

export const deleteTask=async(id)=>{
    const response=await axios.delete(
        `${API}/tasks/${id}`
    )
    return response.data
}