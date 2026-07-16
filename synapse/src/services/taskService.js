import apiClient from "../config/apiClient"

export const getTasks=async()=>{
    
    const response = await apiClient.get(
        "/tasks"
    )
    return response.data
}

export const createTask = async(task) => {

    const response = await apiClient.post(
        "/tasks",
        task
    )
    return response.data
}

export const updateTask = async(id) => {

    const response = await apiClient.patch(
        `/tasks/${id}`
    )
    return response.data
}

export const deleteTask = async(id) => {

    const response = await apiClient.delete(
        `/tasks/${id}`
    )
    return response.data
}