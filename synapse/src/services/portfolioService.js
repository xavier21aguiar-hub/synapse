import axios from "axios"

const API = "http://127.0.0.1:8000"

export const getPortfolioAssets =
async() => {

    const response =
    await axios.get(
        `${API}/portfolio-assets`
    )

    return response.data
}

export const savePortfolioAsset =
async(asset) => {

    const response =
    await axios.post(
        `${API}/portfolio-assets`,
        asset
    )

    return response.data
}