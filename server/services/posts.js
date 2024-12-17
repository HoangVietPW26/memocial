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