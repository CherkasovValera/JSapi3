const photoContainerElement = document.querySelector("#photo-container");
function getRandomInt() {
    return page = Math.floor(Math.random() * 100);
  };
  getRandomInt();
let counter = 9;
let isFetching = true;
getImage(page);
window.addEventListener("scroll", function () {
  checkPosition();
});
function getImage(page) {
  fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=${counter}&client_id=Ju6O2A_FPphO1Bnb8JoYQx52wqWniKMPAZd4iPrSQPc&lang=ru`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка в получении данных! Cтатус ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      response
        .forEach((element) => {
          photoContainerElement.insertAdjacentHTML(
            "beforeend",            
         `<div class="photo-gallery__item">
            <div class="photo-gallery__item-wrap">
               <img class="photo-gallery__item-img" src="${element.urls.small}">
            </div>
            <div class="photo-gallery__item-info">
               <p class="photo-gallery__name-photographer">Фотограф: ${element.user.name}</p>
               <div class="like">
                  <button onClick="countUp(this)" class="fa fa-thumbs-up">Ставим лайк!</button>
                  <p class="count">0</p>
                  
               </div>
            </div>
         </div>
         `
          );
          isFetching = false;
        })
        .catch((error) => console.log(error.massage));
    });
}

function countUp (el) {
    let btnLike = el.parentElement.querySelector(".count");    
    let count = Number.parseInt(btnLike.textContent);    
    count ++;
    showCount(btnLike, count);
 }
 
  
 function showCount (btnLike, count) {
    btnLike.textContent = count;
 }
function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;
  if (position >= threshold && !isFetching) {
    isFetching = true;
    page++;
    getImage(page);
  }
}
