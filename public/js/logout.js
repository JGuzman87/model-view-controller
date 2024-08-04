const logout = async () => {
    const response = await fetch('api/users/logut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        window.location.href = '/'
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);