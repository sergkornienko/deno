import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getPosts,
    getPost,
    addPosts,
    deletePost,
    updatePost } from './controllers/posts.ts';
const router = new Router();

router.get('/api/v1/posts', getPosts)
    .get('/api/v1/posts/:id', getPost)
    .post('/api/v1/posts', addPosts)
    .put('/api/v1/posts/:id', updatePost)
    .delete('/api/v1/posts/:id', deletePost)

export default router;