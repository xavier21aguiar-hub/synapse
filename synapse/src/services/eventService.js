import apiClient from "../config/apiClient"

export const getEvents = async() => {

    const response = await apiClient.get(
        "/events"
    )
    return response.data
}

export const createEvent = async(event) => {

    const response = await apiClient.post(
        "/events",
        event
    )
    return response.data
}

export const updateEvent = async(id) => {

    const response = await apiClient.patch(
        `/events/${id}`
    )
    return response.data
}