const updateFormHandler = async (event) => {
  event.preventDefault();

  const postId = document.querySelector('#post-id').value.trim();
  const postTitle = document.querySelector('#post-title').value.trim();
  const postText = document.querySelector('#post-text').value.trim();

  if (postId && postTitle && postText) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ postTitle, postText }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('.update-post-form')
  .addEventListener('submit', updateFormHandler);
