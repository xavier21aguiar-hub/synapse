import axios from "axios"

const API = "http://127.0.0.1:8000"


export const getReminders = async() => {

    const response =
    await axios.get(
        `${API}/reminders`
    )

    return response.data
}


export const createReminder = async(reminder) => {

    const response =
    await axios.post(
        `${API}/reminders`,
        reminder
    )

    return response.data
}

export const updateReminder = async(id)=>{

    const response =
    await axios.patch(
        `${API}/reminders/${id}`
    )

    return response.data
}