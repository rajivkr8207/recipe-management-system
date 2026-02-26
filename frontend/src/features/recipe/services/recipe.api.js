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