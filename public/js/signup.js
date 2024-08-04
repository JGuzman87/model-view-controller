const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await res.json();
      const message = data.message;

      signup_result.textContent = message;
      signup_result.setAttribute('class', 'success');
      window.location.href = '/api/users/login'
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
