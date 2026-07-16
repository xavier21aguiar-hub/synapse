import apiClient from "../config/apiClient"

export const getTransactions = async() => {

    const response = await apiClient.get(
        "/transactions"
    )
    return response.data
}

export const saveTransaction = async(transaction) => {

    const response = await apiClient.post(
        "/transactions",
        transaction
    )
    return response.data
}