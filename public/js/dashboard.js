const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-post-title").value.trim();
  const content = document.querySelector("#new-post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post!");
    }
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        post_id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

const updateFormHandler = async (event) => {
  event.preventDefault();

  const id = event.target.getAttribute("data-id");
  const title = document.querySelector("#update-post-title").value.trim();
  const contents = document.querySelector("#update-post-content").value.trim();

  if (title && contents) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteButtonHandler);

document
  .querySelector("#update-post")
  .addEventListener("submit", updateFormHandler);
