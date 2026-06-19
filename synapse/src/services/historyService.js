import axios from "axios"
import { API_URL } from "../config/api"

export const saveHistory = async(task) => {
    await axios.post(
        `${API_URL}/history`,
        {
            text: task.text
        }
    )
}

export const getHistory = async() => {
    const response = await axios.get(
        `${API_URL}/history`
    )
    return response.data
}