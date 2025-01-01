import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    messege: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessege = mongoose.model('PostSchema', postSchema)

export default PostMessege