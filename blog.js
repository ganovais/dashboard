const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

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
                <div class="col-12 col-md-4 mb-3 blog" data-blogid="${blog.id}">
                <div class="card">
                    <div class="card-header">
                        <h4>${blog.title.substring(1, 15)}...</h4>
                    </div>
                    <div class="card-body">
                        <p>${blog.body.substring(1, 70)}...</p>
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
        blogs.forEach(blog => {
            blog.onclick = () => {
                console.log(blog.dataset.blogid);
            }
        })
    }
})