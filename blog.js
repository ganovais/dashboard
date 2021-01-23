const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

let actual_blog_id = null;

async function getBlogs() {
    let blogs = [];
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(async data => {
        if(data && data.length) {
            blogs = data.splice(0, 12);
        }
    });

    return blogs;
}

async function getBlogsWithUser(blogs) {
    for (let index = 0; index < blogs.length; index++) {
        const { data: user } = await api.get('/users/' + blogs[index].userId);
        blogs[index].user = user.name; 
    }

    return blogs;
}

async function getHTML(blogs) {
    let html = '';
    blogs.forEach(async blog => {
        html += `
                <div class="col-12 col-md-4 mb-3" data-blogid="${blog.id}">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="title_ blog">${blog.title.substring(0, 7)}...</h4>
                            <p class="delete title_">deletar</p>
                        </div>
                        <div class="card-body">
                            <p>${blog.body.substring(0, 70)}...</p>
                        </div>
                        <div class="card-footer">
                            <small>${blog.user}</small>
                        </div>
                    </div>
                </div>
        `
    });

    return html;
}

document.addEventListener('DOMContentLoaded', async function() {
    let blogs = [];
    let html = '';
    let loading = document.querySelector('#loading');
    loading.classList.remove('d-none');

    blogs = await getBlogs();
    blogs = await getBlogsWithUser(blogs);
    html = await getHTML(blogs);
    
    loading.classList.add('d-none');
    document.getElementById('blogs').innerHTML = html;

    blogs = document.querySelectorAll('.blog');
    if(blogs && blogs.length) {
        blogs.forEach(item => {
            item.onclick = async () => {
                let blog_id = item.parentElement.parentElement.parentElement.dataset.blogid;
                if(actual_blog_id == null || actual_blog_id != blog_id) {
                    actual_blog_id = blog_id;
    
                    const { data: blog } = await api.get('/posts/' + blog_id);
                    let blog_html = document.querySelector('#blog');
                    blog_html.parentElement.classList.remove('d-none');
    
                    blog_html.innerHTML = `<div class="card">
                                                <div class="card-header">
                                                    <h4>${blog.title}</h4>
                                                </div>
                                                <div class="card-body">
                                                    <p>${blog.body}</p>
                                                </div>
                                            </div>`;
                }
            }
        })
    }

    let deletes = document.querySelectorAll('.delete');
    deletes.forEach(item => {
        item.onclick = async () => {
            const pai = item.parentElement.parentElement.parentElement;
            const response = await api.delete('/posts/' + pai.dataset.blogid);

            if(response.status == 200) {
                pai.remove();
                if(actual_blog_id == pai.dataset.blogid) {
                    document.querySelector('#blog').parentElement.classList.add('d-none');
                }
                actual_blog_id = null;
            }
        }
    })
})