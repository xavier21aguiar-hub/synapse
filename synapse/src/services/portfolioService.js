import apiClient from "../config/apiClient"

export const getPortfolioAssets = async() => {

    const response = await apiClient.get(
        "/portfolio-assets"
    )
    return response.data
}

export const savePortfolioAsset = async(asset) => {

    const response = await apiClient.post(
        "/portfolio-assets",
        asset
    )
    return response.data
}