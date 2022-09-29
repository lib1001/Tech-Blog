const commentFormHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const description = document.querySelector('#comment').value.trim();

    if (description) {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({ description }),
            headers:{
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/comment');
        } else {
            alert('Failed to create a comment');
        }
     }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);