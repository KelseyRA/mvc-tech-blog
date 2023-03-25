const createButton = document.querySelector('#create-button');

const newPostHandler = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post-title').value.trim();
  const post_text = document.querySelector('#post-text').value.trim();

  if (post_title && post_text) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ post_title, post_text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

createButton.addEventListener('click', newPostHandler);
