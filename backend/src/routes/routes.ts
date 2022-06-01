import { Router } from "express";
import multer from "multer";
import { storageTypes } from "../config/multer";
import { ListAllPostsController } from "../controllers/ListAllPostsController";
import { UploadPostFileController } from "../controllers/UploadPostFileController";
import { DeletePostController } from '../controllers/DeletePostController';
import { UploadPostUrlController } from '../controllers/UploadPostUrlController';

const router = Router();

const uploadPostFileController = new UploadPostFileController();
const uploadPostUrlController = new UploadPostUrlController();
const listAllPosts = new ListAllPostsController();
const deletePost = new DeletePostController();

router.post(
  '/posts/file',
  multer(storageTypes.s3).single('image'),
  uploadPostFileController.handle
);
router.post('/posts/url', uploadPostUrlController.handle);
router.get('/posts', listAllPosts.handle);
router.delete('/posts/:id', deletePost.handle);

export { router };