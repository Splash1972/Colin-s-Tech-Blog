async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const bloginfo = document.querySelector('#bloginfo').value;

    console.log(bloginfo);
    const response = await fetch(`/api/blog`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            bloginfo  
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(`Error: ${response.statusText}`);
    }
}

// edit blogs

async function editFormHandler(event) {
    event.preventDefault();

    const blogId = event.target.id.split('/').pop();
    const response = await fetch(`/api/blog/${blogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const blog = await response.json();
        // Render the editBlog template with the retrieved data
        const editBlogTemplate = document.querySelector('#edit-blog-template').innerHTML;
        const template = Handlebars.compile(editBlogTemplate);
        const html = template({ blog });
        document.querySelector('#edit-blog-container').innerHTML = html;
    } else {
        alert(`Error: ${response.statusText}`);
    }
}
document.getElementById('new-blog-form').addEventListener('submit', newFormHandler)