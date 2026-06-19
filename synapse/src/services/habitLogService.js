import axios from "axios"
import { API_URL } from "../config/api"

export const getHabitLogs =
async() => {

    const response =
    await axios.get(
        `${API_URL}/habit-logs`
    )
    return response.data
}

export const saveHabitLog =
async(log) => {

    const response =
    await axios.post(
        `${API_URL}/habit-logs`,
        log
    )
    return response.data
}