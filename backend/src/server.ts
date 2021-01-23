import express from 'express';
import { uuid } from 'uuidv4';
import cors from 'cors';

const api = express();

api.use(express.json());
api.use(cors());

interface Blog {
    id: string;
    title: string;
    body: string;
}

let blogs: Blog[] = [];

// Listagem dos blogs
api.get('/api/blogs', (request, response) => {
    return response.json(blogs)
})

//Busca de um blog
api.get('/api/blogs/:id', (request, response) => {
    const id = request.params.id;
    let message = '';
    let blog = blogs.find(blog => blog.id == id);
    if(blog) {
        message = "Blog encontrado"
    } else {
        message = "Blog não encontrado"
    }

    return response.json({
        message: message,
        blog: blog
    })
})

// Cadastrar novo blog
api.post('/api/blogs', (request, response) => {
    const { title, body } = request.body;

    const blog:Blog = {
        id: uuid(),
        title: title,
        body: body
    }

    blogs.push(blog);
    
    return response.json(blog);
})

api.put('/api/blogs/:id', (request, response) => {
    const id = request.params.id;
    console.log(id);
    
    const { title, body } = request.body;

    let index = blogs.findIndex(blog => blog.id == id);
    if(index > -1) {
        blogs[index].title = title;
        blogs[index].body = body;
    }

    return response.json({ message: 'Alterado com sucesso!' });
})

api.delete('/api/blogs/:id', (request, response) => {
    const id = request.params.id;

    let index = blogs.findIndex(blog => blog.id == id);
    if(index > -1) {
        blogs.splice(index, 1);
    }

    return response.json({
        status: 200,
        message: 'Blog ' + id + ' deletado com sucesso!'
    })
})

api.listen(3333, () => {
    console.log('🚀 Server started at port 3333!');
})