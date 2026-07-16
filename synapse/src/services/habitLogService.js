import apiClient from "../config/apiClient"

export const getHabitLogs = async() => {

    const response = await apiClient.get(
        "/habit-logs"
    )
    return response.data
}

export const saveHabitLog = async(log) => {

    const response = await apiClient.post(
        "/habit-logs",
        log
    )
    return response.data
}