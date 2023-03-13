const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentText = document.querySelector('#comment-text').value.trim();
  const postId = document.querySelector('post-id').value.trim();

  if (commentText && postId) {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ postId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);
