async function deleteFormHandler(event) {
    event.preventDefault();
    const blog_id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch (`api/blog/${blog_id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    }  else {
        alert(response.statusText);
    }
}

document.querySelector('#deleteBlog').addEventListener('click', deleteFormHandler);