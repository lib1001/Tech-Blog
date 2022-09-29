const commentFormHandler = async function (event) {
	event.preventDefault();

	const post = document.querySelector('.new-comment-form').dataset.postid;

	const comment_description = document.querySelector('#comment_description').value.trim();

	if (comment_description) {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				post_id,
				comment_description,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		document.location.reload();
	}
};

document
	.querySelector('.new-comment-form')
	.addEventListener('submit', commentFormHandler);