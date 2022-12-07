import {Router} from 'express';
const router = Router();

import{getPost, getPosts, createPost, updatePost, deletePost, filterPosts} from '../controllers/post.controller.js';


router.get('/:id', getPosts);

router.get('/:id/:status', filterPosts);

router.get('/', getPost);

router.post('/', createPost);

router.delete('/:id', deletePost);

router.patch('/:id', updatePost);

export default router;