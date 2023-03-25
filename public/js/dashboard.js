// const deletePost = document.querySelector('#delete-button');

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const post_title = document.querySelector('#post-title').value.trim();
//   const post_text = document.querySelector('#post-text').value.trim();

//   if (post_title && post_text) {
//     const response = await fetch('/api/post', {
//       method: 'POST',
//       body: JSON.stringify({ title, text }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('dashboard');
//     } else {
//       alert('Failed to create post');
//     }
//   }
// };

// const deleteButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/post/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert('Failed to delete post');
//     }
//   }
// };

// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', newFormHandler);

// deletePost.addEventListener('click', deleteButtonHandler);
