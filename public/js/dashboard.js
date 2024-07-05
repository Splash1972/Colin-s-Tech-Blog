async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const bloginfo = document.querySelector('#bloginfo').value;
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

document.querySelector('#new-blog-form').addEventListener('submit', newFormHandler);
