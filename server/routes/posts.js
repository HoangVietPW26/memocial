import express from 'express'
import { getPosts, getPostsBySearch, createPost, updatePost, deletePost, updateLike } from '../services/posts.js'
import auth from '../middleware/auth.js'


const router  = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.patch('/:id/likePost', auth, updateLike)
router.delete('/:id', auth, deletePost)
export default router