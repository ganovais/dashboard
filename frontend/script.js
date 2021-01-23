const api = axios.create({
    baseURL: 'http://localhost:3333/api'
})

let actual_blog_id = null;

async function getHTML(blogs) {
    let html = '';
    blogs.forEach(async blog => {
        html += `
                <div class="col-12 col-md-4 mb-3" data-blogid="${blog.id}">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="cp blog">${blog.title.substring(0, 7)}...</h4>
                            <p class="delete cp">deletar</p>
                            <p class="update cp">alterar</p>
                        </div>
                        <div class="card-body">
                            <p>${blog.body.substring(0, 70)}...</p>
                        </div>
                    </div>
                </div>
        `
    });

    return html;
}

function getBlog() {
    blogs = document.querySelectorAll('.blog');
    if(blogs && blogs.length) {
        blogs.forEach(item => {
            item.onclick = async () => {
                let blog_id = item.parentElement.parentElement.parentElement.dataset.blogid;
                if(actual_blog_id == null || actual_blog_id != blog_id) {
                    actual_blog_id = blog_id;
    
                    const { data } = await api.get('/blogs/' + blog_id);
                    let blog = data.blog
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
}

function deleteBlog() {
    let deletes = document.querySelectorAll('.delete');
    deletes.forEach(item => {
        item.onclick = async () => {
            const pai = item.parentElement.parentElement.parentElement;
            const response = await api.delete('/blogs/' + pai.dataset.blogid);
            if(response.data.status == 200) {
                pai.remove();
                if(actual_blog_id == pai.dataset.blogid) {
                    document.querySelector('#blog').parentElement.classList.add('d-none');
                }
                toastr.success(response.data.message);
                actual_blog_id = null;
            }
        }
    })
}

function updateBlog() {
    let updates = document.querySelectorAll('.update');
    updates.forEach(item => {
        item.onclick = async () => {
            const pai = item.parentElement.parentElement.parentElement;
            const response = await api.get('/blogs/' + pai.dataset.blogid);
            if(response.data.blog) {
                let form = document.querySelector('#form');
                form.parentElement.parentElement.classList.remove('d-none');

                document.querySelector('#title').value = response.data.blog.title;
                document.querySelector('#body').value = response.data.blog.body;
                document.querySelector('#blog_id').value = response.data.blog.id;
            }
        }
    })
}
document.addEventListener('DOMContentLoaded', async function() {
    const { data: blogs } = await api.get('/blogs');
    const html = await getHTML(blogs);
    const blogs_html = document.querySelector('#blogs');
    blogs_html.innerHTML = html;

    getBlog();
    deleteBlog();
    updateBlog();

    let form = null;
    document.querySelector('#create').onclick = () => {
        form = document.querySelector('#form');
        form.parentElement.parentElement.classList.remove('d-none');
    };

    document.querySelector('#form').onsubmit = async (e) => {
        // e.preventDefault()
        const blog_id = document.querySelector('#blog_id').value;
        if(!blog_id) {
            const response = await api.post('/blogs', {
                title: document.querySelector('#title').value,
                body: document.querySelector('#body').value,
            })
        } else {
            const response = await api.put('/blogs/' + blog_id, {
                title: document.querySelector('#title').value,
                body: document.querySelector('#body').value,
            })
        }
    }

})