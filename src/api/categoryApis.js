import axiosInstance from "./api"

export const createCategory = (body) => axiosInstance.post('/category/create', { ...body })

export const getCategories = (body) => axiosInstance.get(`/category/AllCategories?page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)

export const getCategory = ({ id }) => axiosInstance.get(`/category/${id}`)

export const updateCategory = ({ id, body }) => axiosInstance.put(`/category/Update/${id}`, { ...body })

export const deleteCategory = ({ id }) => axiosInstance.delete(`/category/Delete/${id}`)

export const searchForCategory = ({ search, ...body }) => axiosInstance.get(`/category/Search?keyword=${search?.toLowerCase()}page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)