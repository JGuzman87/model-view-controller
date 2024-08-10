const newFormHandler =  async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const date = document.querySelector('#blog-date').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && date && content) {
        const response = await fetch('api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, date, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }else {
            alert('Failed to create blog');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',

        });

        if (response.ok) {
            document.location.replace('/dashboard');

        }else {
            alert('Failed to delete blog');
        }


    }
};

const formElement = document.querySelector('.new-blog-form');
if (formElement) {
    formElement.addEventListener('submit', newFormHandler);
}

const blogListElement = document.querySelector('.blog-list');
if (blogListElement) {
    blogListElement.addEventListener('click', delButtonHandler);
}