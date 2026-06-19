import axios from "axios"
import { API_URL } from "../config/api"

export const getPortfolioAssets =
async() => {

    const response =
    await axios.get(
        `${API_URL}/portfolio-assets`
    )
    return response.data
}

export const savePortfolioAsset =
async(asset) => {

    const response =
    await axios.post(
        `${API_URL}/portfolio-assets`,
        asset
    )
    return response.data
}