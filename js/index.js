let privateLink = document.querySelector(".private-link");
let logOutBtn = document.querySelector(".logout-btn");
let privateLink2 = document.querySelector(".private-link2");
let loginLink = document.querySelector(".login-link");
let UserLink = document.querySelector(".user-link");
let postList = document.querySelector(".post-list");
let animationId = document.getElementById("animation-light");

let className = localStorage.getItem("class");
console.log(className);

logOutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("./login.html");
});

let moon = document.createElement("div");
let createMoon = () => {
  moon.setAttribute("class", "light");
  moon.innerHTML = `<i class="bi bi-brightness-high"></i>`;
  animationId.setAttribute("id", "animation-ligth");
  animationId.appendChild(moon);
  localStorage.setItem("class", moon.classList);
};

let sun = document.createElement("div");
let createSun = () => {
  sun.setAttribute("class", "moon");
  sun.innerHTML = `<i class="bi bi-moon-stars"></i>`;
  animationId.setAttribute("id", "animation-container");
  animationId.appendChild(sun);
  localStorage.setItem("class", sun.classList);
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

privateLink.classList.add("d-none");
privateLink2.classList.add("d-none");
logOutBtn.classList.add("d-none");
let token = localStorage.getItem("access-token") || null;
if (token) {
  let getUser = async () => {
    try {
      let res = await fetch(`https://webstar-post-app.onrender.com/api/`, {
        method: "GET",
        headers: { access_token: token },
      });
      let date = await res.json();
      localStorage.setItem("profile", JSON.stringify(date.user));
      privateLink.classList.remove("d-none");
      privateLink2.classList.remove("d-none");
      loginLink.classList.add("d-none");
      logOutBtn.classList.remove("d-none");
      UserLink.textContent = date.user.name[0];
      UserLink.setAttribute("href", "#");
    } catch (error) {
      console.log(error);
    }
  };
  getUser();
}
let savePostId = (id) => {
  localStorage.setItem("postId", id);
};
let cards = `
    <div class="card w-25 me-2 mb-3" aria-hidden="true">
      <img src="true" class="card-img-top p-3 h-25" alt="...loading">
    <div class="card-bod p-3">
     <h5 class="card-title placeholder-glow">
    <span class="placeholder col-6"></span>
    </h5>
      <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
      </p>
      <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
    </div>
    </div>
`;
let result = `
<div style="display: flex; justify-content: space-around;"> 
${cards}${cards}${cards}${cards}
</div>
<div style="display: flex; justify-content: space-around;"> 
${cards}${cards}${cards}${cards}
</div>
`;

postList.innerHTML = result;
let display = (posts) => {
  result = "";
  posts.forEach((post) => {
    result =
      result +
      `      
      <div class="col-12 col-md-6 col-lg-3 p-2 mb-3">
          <div class="card">
             <img src="${post.image.url}" class="card-img-top" alt="post-img" />
          <div class="card-content">
              <h3>${post.title.slice(0, 20)}</h3>
            <p>${post.content.slice(0, 50)}...</p>
            <a onclick="savePostId('${
              post._id
            }')" href="./post.html" class="btn btn-primary">Read More <i class="bi bi-book"></i></a>
          </div>
          </div>
      </div>
      `;
  });

  postList.innerHTML = result;
};

let getPosts = async () => {
  try {
    let res = await fetch(`https://webstar-post-app.onrender.com/api/post`, {
      method: "GET",
    });
    let data = await res.json();
    display(data);
  } catch (error) {
    console.log(error);
  }
};
getPosts();
