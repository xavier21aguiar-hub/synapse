import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getHabits =
async() => {

    const response =
    await axios.get(
        `${API}/habits`
    )

    return response.data
}

export const saveHabit =
async(habit) => {

    const response =
    await axios.post(
        `${API}/habits`,
        habit
    )

    return response.data
}

export const deleteHabit =
async(id) => {

    const response =
    await axios.delete(
        `${API}/habits/${id}`
    )

    return response.data
}