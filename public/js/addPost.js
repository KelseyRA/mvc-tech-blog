const newFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postText = document.querySelector('post-text').value.trim();

  if (postTitle && postText) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postText }),
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
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
