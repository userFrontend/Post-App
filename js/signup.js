let signUpForm = document.querySelector(".signup-form");
let alerts = document.querySelector(".alert-mod");
let alertText = document.querySelector(".alert-text");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   let alertt = document.querySelector(".balls");
  try {
    let res = await fetch("https://webstar-post-app.onrender.com/api/signup", {
      method: "Post",
      body: new FormData(e.target),
    });
    let date = await res.json();
    localStorage.setItem("access-token", date.token);
    alerts.setAttribute("class", "d-block c-info");
    alertText.textContent = date.message;
    if (res.status == 201) {
      window.location.replace("./index.html");
    }
  } catch (error) {
    alertText.textContent = error.message;
    alerts.setAttribute("class", "d-block c-danger");
  }
});
