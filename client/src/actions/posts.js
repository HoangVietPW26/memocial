import * as api from '../api'
import { CREATE, FETCH_ALL, FETCH_BY_SEARCH, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';
// Action creators

export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        console.log(data)
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery)
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const data = await api.createPost(post)
        dispatch({type: CREATE, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const updateLike = (id) => async (dispatch) => {
    try {
        const {data} = await api.updateLike(id)
        dispatch({type: LIKE, payload:data})
    } catch (error) {
        console.log(error)
    }
}