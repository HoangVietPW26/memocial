import mongoose from "mongoose"
import PostMessege from "../models/postMessege.js"

export const getPosts = async (req, res) => {
    const {page} = req.query
    try {
        const LIMIT = 8
        const startIndex = (Number(page) - 1) * LIMIT // get the start index of page
        const total = await PostMessege.countDocuments({})

        const posts = await PostMessege.find().sort({_id: -1}).limit(LIMIT).skip(startIndex)
        // console.log(posts)
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    } catch (error) {
        res.status(404).json({messege: error.messege})
    }
}

export const getPostsBySearch = async(req, res) => {
    const {searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await PostMessege.find({$or: [{title}, {tags: {$in: tags.split(',')}}]})
        res.json({data: posts})
    } catch (error) {
        res.status(404).json({messege: error.messege})
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessege({...post, creator: req.userId, createdAt: new Date().toISOString()})
    
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

    if(!req.userId) return res.json({messege: "Unauthenticated"})

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }

    
    try {
        const post = await PostMessege.findById(_id)
        const index = post.likedBy.findIndex((id)=> id === String(req.userId))
        if (index === -1) {
            post.likedBy.push(req.userId)
        } else {
            // console.log(req.userId)
            post.likedBy = post.likedBy.filter((id)=>id !== String(req.userId))  
            // console.log(post.likedBy)     
        }
        const updatePost = await PostMessege.findByIdAndUpdate(_id, post, {new: true})
        
        res.json(updatePost)
    } catch (error) {
        console.log(error)
    }
}