import axiosInstance from "./api"

export const createCategory = (body) => axiosInstance.post('/category/create', {...body})

export const getCategories = () => axiosInstance.get('/category/AllCategories')

export const getCategory = ({ id }) => axiosInstance.get(`/category/${id}`)

export const updateCategory = ({ id, body }) => axiosInstance.put(`/category/Update/${id}`, { ...body })

export const deleteCategory = ({ id }) => axiosInstance.delete(`/category/Delete/${id}`)

export const searchForCategory =({search}) => axiosInstance.get(`/category/Search?keyword=${search}`)