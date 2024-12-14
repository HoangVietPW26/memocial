import express from 'express'
import { getPosts } from '../services/posts'

const router  = express.Router()

router.get('/', getPosts)

export default router