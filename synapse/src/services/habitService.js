import axios from "axios"
import { API_URL } from "../config/api"

export const getHabits =
async() => {

    const response =
    await axios.get(
        `${API_URL}/habits`
    )
    return response.data
}

export const saveHabit =
async(habit) => {

    const response =
    await axios.post(
        `${API_URL}/habits`,
        habit
    )
    return response.data
}

export const deleteHabit =
async(id) => {

    const response =
    await axios.delete(
        `${API_URL}/habits/${id}`
    )
    return response.data
}