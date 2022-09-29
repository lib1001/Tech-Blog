const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_content = document.querySelector("#comment").value.trim();

  if (comment_content) {
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ comment_content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/comment");
    } else {
      alert("Failed to create a comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
