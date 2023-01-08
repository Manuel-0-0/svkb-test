import axiosInstance from './api'

export const createArticle = (body) => axiosInstance.post('/articles/NewArticle', {...body})

export const getArticles = (body) => axiosInstance.get(`/articles/All?page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit :6}`)

export const getPublishedArticles = (body) => axiosInstance.get(`/articles/All?draftStatus=false&page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)

export const getDraftArticles = (body) => axiosInstance.get(`/articles/All?draftStatus=true&page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)

export const getArticle = ({ id }) => axiosInstance.get(`/articles/${id}`)

export const getArticleInCategory = ({ id }) => axiosInstance.get(`/articles/?CategoryId=${id}`)

export const getPublishedArticlesInCategory = ({ id, ...body }) => axiosInstance.get(`/articles/published/?CategoryId=${id}&page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)

export const updateArticle = ({ id, body }) => axiosInstance.put(`/articles/Update/${id}`, { ...body })

export const deleteArticle = ({ id }) => axiosInstance.delete(`/articles/Delete/${id}`)

export const searchForPublishedArticle =({search}) => axiosInstance.get(`/articles/Search/?keyword=${search?.toLowerCase()}`)

export const searchForArticle =({search}) => axiosInstance.get(`/articles/Search/?keyword=${search?.toLowerCase()}`)

export const getUserArticles = ({id , ...body}) =>axiosInstance.get(`/articles/user/${id}?page=${body?.page ? body?.page : 0}&limit=${body?.limit ? body?.limit : 6}`)