import axios from 'axios'

const url =  process.env.BACK_END_URL ? `${process.env.BACK_END_URL}posts` : 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) => axios.post(url, newPost)
export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost)
export const deletePost = (id) =>axios.delete(`${url}/${id}`)
export const updateLike = (id) => axios.patch(`${url}/${id}/likePost`)