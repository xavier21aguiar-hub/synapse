import apiClient from "../config/apiClient"

export const getGoals = async() => {

    const response = await apiClient.get(
        "/financial-goals"
    )
    return response.data
}

export const saveGoal = async(goal) => {

    const response = await apiClient.post(
        "/financial-goals",
        goal
    )
    return response.data
}