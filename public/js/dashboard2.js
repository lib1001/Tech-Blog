const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const contents = document.querySelector('#new-post-content').value.trim();

    if (title && contents) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers:{
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog post');
        }
     }
};

document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newFormHandler);