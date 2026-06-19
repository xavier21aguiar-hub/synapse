import axios from "axios"
import { API_URL } from "../config/api"


export const getTasks=async()=>{
    
    const response= await axios.get( 
        `${API_URL}/tasks` 
    )
    return response.data
}

export const createTask=async(task)=>{
    
    const response= await axios.post( 
        `${API_URL}/tasks`,
        task
    ) 
    return response.data
}

export const updateTask=async(id)=>{
    const response=await axios.patch(
        `${API_URL}/tasks/${id}`
    )
    return response.data
}

export const deleteTask=async(id)=>{
    const response=await axios.delete(
        `${API_URL}/tasks/${id}`
    )
    return response.data
}