let postBody = document.querySelector(".post");
let logOutBtn = document.querySelector(".logout-btn");
let commentsList = document.querySelector(".comments-list");
let commentsForm = document.querySelector(".comment-form");
let animationId = document.getElementById("animation-light");
let contentInput = document.querySelector(".content-input");
let editForm = document.querySelector(".edit-form");
let btnClose = document.querySelector(".btn-close");
let editBtn = document.querySelector(".edit-btn");

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

let result = `
   <div class="card w-100 me-2 mb-3 text-center" aria-hidden="true">
   <div class="card-bod p-3">
   <h5 class="card-title placeholder-glow">
   <span class="placeholder bg-info col-6"></span>
   </h5>
   <img src="true" class="card-img-top p-3 h-50" alt="...loading">
      <p class="card-text placeholder-glow">
      <span class="placeholder col-8"></span>
      <span class="placeholder col-7"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      </p>
      <a href="#" tabindex="-1" class="btn btn-info disabled placeholder col-1"></a>
      <a href="#" tabindex="-1" class="btn btn-danger disabled placeholder col-1"></a>
      <a href="#" tabindex="-1" class="btn btn-success disabled placeholder col-1"></a>
    </div>
    </div>
`;
postBody.innerHTML = result;

let post = null;

let getPost = async (id) => {
  try {
    let res = await fetch(
      `https://webstar-post-app.onrender.com/api/post/${id}`,
      { method: "GET" }
    );
    let result = "";
    let data = await res.json();
    post = data[0];
    post.comments.forEach((comms) => {
      result = result + comms;
    });
    // console.log(result);
    postBody.innerHTML = `
          <h1 class="text-center text-info my-3">${post.title}</h1>
          <img class="w-50 d-block mx-auto mb-3" src="${post.image.url}" alt="${
      post.title
    }" />
          <p>${post.content}</p>
          <small>${post.createdAt.slice(0, 10)}</small>
          <blockquote><q>${post.author[0].name} ${
      post.author[0].surname
    }</q></blockquote>
          <button onclick="likePost()" class="btn btn-outline-info">${
            post.like.length
          } <i class="bi bi-hand-thumbs-up like-post"></i></button>
          <button onclick="dislikePost()" class="btn btn-outline-danger">${
            post.dislike.length
          } <i class="bi bi-hand-thumbs-down dislike-post"></i></button>
          <button onclick="showComment()" class="btn btn-outline-success">${
            post.comments.length
          } <i class="bi bi-chat-text"></i></button>
    `;
    post.like.forEach((love) => {
      if (myId() == love) {
        let btnLIke = document.querySelector(".like-post");
        btnLIke.setAttribute("class", " bi bi-hand-thumbs-up-fill");
      }
    });
    post.dislike.forEach((dislove) => {
      if (myId() == dislove) {
        let btnLIke = document.querySelector(".dislike-post");
        btnLIke.setAttribute("class", "bi bi-hand-thumbs-down-fill");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

let postId = localStorage.getItem("postId") || null;
if (postId) {
  getPost(postId);
}

let token = localStorage.getItem("access-token") || null;

let myId = () => JSON.parse(localStorage.getItem("profile")).id;

let likePost = async () => {
  try {
    let res = await fetch(
      `https://webstar-post-app.onrender.com/api/like/${postId}`,
      { method: "GET", headers: { access_token: token } }
    );

    let result = await res.json();

    getPost(postId);
  } catch (error) {
    console.log(error);
  }
};

let dislikePost = async () => {
  try {
    let res = await fetch(
      `https://webstar-post-app.onrender.com/api/dislike/${postId}`,
      { method: "GET", headers: { access_token: token } }
    );
    let result = await res.json();
    getPost(postId);
  } catch (error) {
    console.log(error);
  }
};

let showComment = (arr) => {
  result = "";
  post.comments.forEach((comment) => {
    let set = comment.author[0]._id;
    console.log(set);
    let btn = null;
    if (set == myId()) {
      btn = ` 
        <button style="background: none; color: blue; border: none; " onclick="editComment('${comment.content}', '${comment._id}')" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></button>
        <button style="background: none; color: red; border: none; " onclick="delComment('${comment._id}')" class="del-btn btn"><i class="bi bi-trash3"></i></button>
      `;
      // console.log(set);
    } else {
      btn = "";
    }
    result =
      result +
      `
        <li style="border-bottom :1px solid black; padding-top: 10px" class="d-flex justify-content-between align-content-center">
            <p style="font-size: 22px; color: blue;">
              ${comment.content}
            </p>  
            
            <div>
              ${btn}    
            </div>
            <div>
              <blockquote style="font-size: 14px; margin-bottom: -10px ">${
                comment.author[0].name
              } ${comment.author[0].surname}</blockquote>
              <small style="font-size: 10px; color: red;">${comment.createdAt.slice(
                0,
                10
              )}</small>
            </div>                 
        </li>
    `;
  });
  commentsList.innerHTML = result;
};

commentsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    let data = new FormData(e.target);
    data.append("postId", postId);
    let res = await fetch(`https://webstar-post-app.onrender.com/api/comment`, {
      method: "POST",
      body: data,
      headers: { access_token: token },
    });
    let result = await res.json();
    showAlert(result.message);
    commentsForm.reset();
    await getPost(postId);
    showComment();
  } catch (error) {
    console.log(error);
  }
});

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

let delComment = async (id) => {
  document.getElementById("top-alert").style.backgroundColor = "red";
  try {
    let delet = confirm("Commentni o'chirmoqchimisiz?");
    if (delet) {
      let res = await fetch(
        `https://webstar-post-app.onrender.com/api/comment/${id}`,
        {
          method: "DELETE",
          headers: { access_token: token },
        }
      );
      let data = await res.json();
      showAlert(data.message);
      await getPost(postId);
      showComment();
    }
  } catch (error) {
    console.log(error);
  }
};

let commentId = null;

let editComment = async (content, id) => {
  document.getElementById("top-alert").style.backgroundColor = "cornflowerblue";
  contentInput.value = content;
  commentId = id;
};

let getComment = async (e, id) => {
  try {
    let res = await fetch(
      `https://webstar-post-app.onrender.com/api/comment/${id}`,
      {
        method: "PUT",
        body: new FormData(e.target),
        headers: { access_token: token },
      }
    );
    let data = await res.json();
    btnClose.click();
    showAlert(data.message);
    await getPost(postId);
    showComment();
  } catch (error) {
    console.log(error);
  }
};

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getComment(e, commentId);
});
