import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getGoals = async() => {
    const response =
    await axios.get(
        `${API}/financial-goals`
    )
    return response.data
}

export const saveGoal = async(
    goal
) => {
    const response =
    await axios.post(
        `${API}/financial-goals`,
        goal
    )
    return response.data
}