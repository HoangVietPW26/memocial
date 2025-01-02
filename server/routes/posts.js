import express from 'express'
import { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, updateLike } from '../services/posts.js'
import auth from '../middleware/auth.js'


const router  = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.patch('/:id/likePost', auth, updateLike)
router.delete('/:id', auth, deletePost)
export default router