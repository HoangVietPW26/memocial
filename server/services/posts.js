import mongoose from "mongoose"
import PostMessege from "../models/postMessege.js"

export const getPosts = async (req, res) => {
    try {
        const postMesseges = await PostMessege.find()
        console.log(postMesseges)
        res.status(200).json(postMesseges)
    } catch (error) {
        res.status(404).json({messege: error.messege})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessege(post)
    
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({messege: error.messege})
    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    
    try {
        const updatePost = await PostMessege.findByIdAndUpdate(_id, {...post, _id}, {new: true})
        res.json(updatePost)
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    const {id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id')
    }

    try {
        await PostMessege.findByIdAndDelete(id)

        res.json({messege: 'Post deleted succesfully'})
    } catch (error) {
        console.log(error)
    }

}

export const updateLike = async (req, res) => {
    const {id: _id} = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    
    try {
        const post = await PostMessege.findById(_id)
        const updatePost = await PostMessege.findByIdAndUpdate(_id, {likeCount: post.likeCount+1}, {new: true})
        
        res.json(updatePost)
    } catch (error) {
        console.log(error)
    }
}