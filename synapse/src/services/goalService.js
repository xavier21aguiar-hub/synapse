import axios from "axios"
import { API_URL } from "../config/api"

export const getGoals = async() => {
    const response =
    await axios.get(
        `${API_URL}/financial-goals`
    )
    return response.data
}

export const saveGoal = async(
    goal
) => {
    const response =
    await axios.post(
        `${API_URL}/financial-goals`,
        goal
    )
    return response.data
}