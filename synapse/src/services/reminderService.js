import apiClient from "../config/apiClient"

export const getReminders = async() => {

    const response = await apiClient.get(
        "/reminders"
    )
    return response.data
}

export const createReminder = async(reminder) => {

    const response = await apiClient.post(
        "/reminders",
        reminder
    )
    return response.data
}

export const updateReminder = async(id) => {

    const response = await apiClient.patch(
        `/reminders/${id}`
    )
    return response.data
}