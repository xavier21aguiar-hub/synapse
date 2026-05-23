import axios from "axios"

const API = "http://127.0.0.1:8000"

export const saveHistory = async(task) => {
    await axios.post(
        `${API}/history`,
        {
            text: task.text
        }
    )
}

export const getHistory = async() => {
    const response = await axios.get(
        `${API}/history`
    )
    return response.data
}