import { Post } from '../types.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let posts: Post[] = [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
      "userId": 1,
      "id": 4,
      "title": "eum et est occaecati",
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    },
    {
      "userId": 1,
      "id": 5,
      "title": "nesciunt quas odio",
      "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
    },
    {
      "userId": 1,
      "id": 6,
      "title": "dolorem eum magni eos aperiam quia",
      "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
    },
    {
      "userId": 1,
      "id": 7,
      "title": "magnam facilis autem",
      "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
    },
    {
      "userId": 1,
      "id": 8,
      "title": "dolorem dolore est ipsam",
      "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
    },
    {
      "userId": 1,
      "id": 9,
      "title": "nesciunt iure omnis dolorem tempora et accusantium",
      "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
    }
];

// GET /api/v1/posts
const getPosts = ({ response }: { response: any }) => {
    response.body = {
        items: posts,
    };
};

// GET /api/v1/posts/:id
const getPost = ({ response, params }: { response: any, params: { id: string } }) => {
    const item: Post | undefined = posts.find(p => p.id === Number(params.id));
    if (item) {
        response.body = {
            success: true,
            item,
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "Post with this id doesn't exist",
        }; 
    }
};

// POST /api/v1/posts
const addPosts = async ({ response, request }: { response: any, request: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
        response.body = {
            success: false,
            msg: 'Invalid body',
        }; 
    } else {
        const post: Post = body.value;
        const item = Object.assign({ id: v4.generate() }, post);
        posts.push(item);
        response.body = {
            success: true,
            item,
        }
    }
};

// DELETE /api/v1/posts/:id
const deletePost = ({ response, params }: { response: any, params: { id: string } }) => {
    const item: Post | undefined = posts.find(p => p.id === Number(params.id));
    posts = posts.filter(p => p.id !== Number(params.id));
    if (item) {
        response.body = {
            success: true,
            item,
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "Post with this id doesn't exist",
        }; 
    }
};

// PUT /api/v1/posts/:id
const updatePost = async ({ response, params, request }: { response: any, params: { id: string }, request: any }) => {
    const body = await request.body();
    const post: Post | undefined = posts.find(p => p.id === Number(params.id));
    
    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            msg: 'Invalid body',
        };
    } else if (!post) {
        response.status = 404;
        response.body = {
            success: false,
            msg: "Post with this id doesn't exist",
        }; 
    } else {
        posts = posts.map(post => {
            if (post.id === Number(params.id)) {
                return body.value;
            }
            return post;
        });
        response.body = {
            success: true,
            item: body.value,
        }; 
    }
};

export { getPosts, getPost, addPosts, deletePost, updatePost };