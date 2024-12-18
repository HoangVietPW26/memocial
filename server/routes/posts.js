import express from 'express'
import { getPosts, createPost, updatePost, deletePost, updateLike } from '../services/posts.js'

const router  = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.patch('/:id/likePost', updateLike)
router.delete('/:id', deletePost)

export default router