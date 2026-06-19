import axios from "axios"
import { API_URL } from "../config/api"

export const getReminders = async() => {

    const response =
    await axios.get(
        `${API_URL}/reminders`
    )
    return response.data
}

export const createReminder = async(reminder) => {

    const response =
    await axios.post(
        `${API_URL}/reminders`,
        reminder
    )
    return response.data
}

export const updateReminder = async(id)=>{

    const response =
    await axios.patch(
        `${API_URL}/reminders/${id}`
    )
    return response.data
}