import axios from "axios"
import { API_URL } from "../config/api"

export const getEvents = async() => {

    const response =
    await axios.get(
        `${API_URL}/events`
    )
    return response.data
}

export const createEvent = async(event) => {

    const response =
    await axios.post(
        `${API_URL}/events`,
        event
    )
    return response.data
}

export const updateEvent = async(id)=>{

    const response =
    await axios.patch(
        `${API_URL}/events/${id}`
    )
    return response.data
}