import express from "express";
import { signupUser , loginUser,logoutUser } from '../controller/user-controller.js';
import { uploadImage, getImage  } from '../controller/image-controller.js';

import upload from '../utils/upload.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js'

import { newComment, getComments, deleteComment } from '../controller/comment-controller.js'

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create',authenticateToken ,createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);


export default router;