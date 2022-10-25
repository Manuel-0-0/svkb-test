import axiosInstance from "./api"

export const createCategory = (body) => axiosInstance.post('/category/create', body)

export const getCategories = () => axiosInstance.get('/category/AllCategories')

export const getCategory = ({ id }) => axiosInstance.get(`/category/${id}`)

export const updateCategory = ({ id, body }) => axiosInstance.patch(`/category/${id}`, { ...body })

export const deleteCategory = ({ id }) => axiosInstance.delete(`/category/${id}`)