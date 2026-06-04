import axios from "axios"

const API = "http://127.0.0.1:8000"


export const getEvents = async() => {

    const response =
    await axios.get(
        `${API}/events`
    )

    return response.data
}


export const createEvent = async(event) => {

    const response =
    await axios.post(
        `${API}/events`,
        event
    )

    return response.data
}

export const updateEvent = async(id)=>{

    const response =
    await axios.patch(
        `${API}/events/${id}`
    )

    return response.data
}