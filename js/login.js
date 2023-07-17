let loginForm = document.querySelector(".login-form");
let animationId = document.getElementById("animation-light");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   let alertt = document.querySelector(".balls");
  try {
    let res = await fetch("https://webstar-post-app.onrender.com/api/login", {
      method: "Post",
      body: new FormData(e.target),
    });
    let date = await res.json();
    showAlert(date.message);
    setTimeout(function () {
      localStorage.setItem("access-token", date.token);
      if (res.status == 200) {
        window.location.replace("./index.html");
      }
    }, 3000);
  } catch (error) {
    console.log(error);
  }
});

let moon = document.createElement("div");
let createMoon = () => {
  moon.setAttribute("class", "light");
  moon.innerHTML = `<i class="bi bi-brightness-high"></i>`;
  animationId.setAttribute("id", "animation-ligth");
  animationId.appendChild(moon);
};

let sun = document.createElement("div");
let createSun = () => {
  sun.setAttribute("class", "moon");
  sun.innerHTML = `<i class="bi bi-moon-stars"></i>`;
  animationId.setAttribute("id", "animation-container");
  animationId.appendChild(sun);
};

moon.addEventListener("click", () => {
  moon.remove();
  createSun();
});
sun.addEventListener("click", () => {
  sun.remove();
  createMoon();
});

let createStar = () => {
  let star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
  star.style.animationDelay = `${Math.random() * 2}s`;
  animationId.appendChild(star);
};

let createNight = () => {
  for (let i = 0; i < 100; i++) {
    createStar();
  }
  createMoon();
};

createNight();

function showAlert(message) {
  document.getElementById("top-alert").innerHTML = message;
  document.getElementById("top-alert").style.display = "block";

  setTimeout(function () {
    document.getElementById("top-alert").style.opacity = "1";
  }, 100);

  setTimeout(function () {
    document.getElementById("top-alert").style.opacity = "0";
  }, 3000);

  setTimeout(function () {
    document.getElementById("top-alert").style.display = "none";
  }, 4000);
}
