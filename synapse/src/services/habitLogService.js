import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getHabitLogs =
async() => {

    const response =
    await axios.get(
        `${API}/habit-logs`
    )

    return response.data
}

export const saveHabitLog =
async(log) => {

    const response =
    await axios.post(
        `${API}/habit-logs`,
        log
    )

    return response.data
}