import axios from "axios"
import { API_URL } from "../config/api"

export const getTransactions = async() => {

    const response =
    await axios.get(
        `${API_URL}/transactions`
    )
    return response.data
}

export const saveTransaction = async(
    transaction
) => {

    const response =
    await axios.post(
        `${API_URL}/transactions`,
        transaction
    )
    return response.data
}