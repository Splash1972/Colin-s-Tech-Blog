async function editFormHandler(event) {
    event.preventDefault();
    const blog_id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];
    const blog_title = document.querySelector('blog-title').value.trim();
    if (blog_title) {
        const response = await fetch(`api/blog/${blog_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: blog_title
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#editBlogForm').addEventListener('submit', editFormHandler);