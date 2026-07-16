import apiClient from "../config/apiClient"

export const saveHistory = async(task) => {

    const response = await apiClient.post(
        "/history",
        {
            text: task.text
        }
    )
    return response.data
}

export const getHistory = async() => {

    const response = await apiClient.get(
        "/history"
    )
    return response.data
}