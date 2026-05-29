import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getTransactions = async() => {

    const response =
    await axios.get(
        `${API}/transactions`
    )

    return response.data
}

export const saveTransaction = async(
    transaction
) => {

    const response =
    await axios.post(
        `${API}/transactions`,
        transaction
    )

    return response.data
}