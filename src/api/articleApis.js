import axiosInstance from './api'

export const createArticle = (body) => axiosInstance.post('/articles/NewArticle', {...body})

export const getArticles = () => axiosInstance.get('/articles/All')

export const getPublishedArticles = () => axiosInstance.get('/articles/All?draftStatus=false')

export const getDraftArticles = () => axiosInstance.get('/articles/All?draftStatus=true')

export const getArticle = ({ id }) => axiosInstance.get(`/articles/${id}`)

export const getArticleInCategory = ({ id }) => axiosInstance.get(`/articles/?CategoryId=${id}`)

export const updateArticle = ({ id, body }) => axiosInstance.put(`/articles/Update/${id}`, { ...body })

export const deleteArticle = ({ id }) => axiosInstance.delete(`/articles/Delete/${id}`)

export const searchForArticle =({search}) => axiosInstance.get(`/articles/Search?keyword=${search}`)

export const getUserArticles = ({id}) =>axiosInstance.get(`/articles/user/${id}`)