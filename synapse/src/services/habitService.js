import apiClient from "../config/apiClient"

export const getHabits = async() => {

    const response = await apiClient.get(
        "/habits"
    )
    return response.data
}

export const saveHabit = async(habit) => {

    const response = await apiClient.post(
        "/habits",
        habit
    )
    return response.data
}

export const deleteHabit = async(id) => {

    const response = await apiClient.delete(
        `/habits/${id}`
    )
    return response.data
}