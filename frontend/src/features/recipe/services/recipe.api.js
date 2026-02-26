import api from "../../axios/Axios";




export const fetchRecipeById = async (id) => {
    const res = await api.get(`/recipe/${id}`)
    return res.data
}

export const UpdateRecipeById = async (id, data) => {
    const res = await api.put(`/recipe/${id}`, data)
    return res.data
}

export const DeletedRecipeById = async (id) => {
    const res = await api.delete(`/recipe/${id}`)
    return res.data
}

export const searchRecipeByQuery = async (query) => {
    const res = await api.get(`/recipe/${query}`)
    return res.data
}

export const createFavorite = async (id) => {
    const res = await api.post(`/favourite/${id}`)
    return res.data
}

export const deleteFavorite = async (id) => {
    const res = await api.delete(`/favourite/${id}`)
    return res.data
}

export const GetAllFavorite = async () => {
    const res = await api.get(`/favourite/all`)
    return res.data
}
