"use strict";

// URLS

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c&query=";
const TOP_PICKS =
  "https://api.themoviedb.org/3/tv/popular?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c";

const FAN_FAVORITES =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c";

const ACTORS =
  "https://api.themoviedb.org/3/person/popular?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c";

// Elements

const searchedMoviesContainer = document.querySelector(".searched_movies");
const actorsContainer = document.querySelector(".actors");
const topPicksContainer = document.querySelector(".top_picks");
const fanFavoritesContainer = document.querySelector(".fan_favorites");
const sliderContainer = document.querySelector(".slider");
const hideContent = document.querySelector(".container_little_sliders");
const newPageForTrailer = document.querySelector(".hidden");
const search_btn = document.querySelector(".search");
const seeAll_topPicks = document.querySelector(".topPicks");
const seeAll_favorites = document.querySelector(".favorites");
const seeAll_actores = document.querySelector(".allActors");
const hiddenSectionTop = document.querySelector(".hidden-section-top");
const hiddenSectionFavorites = document.querySelector(
  ".hidden-section-favorites"
);
const hiddenSectionActors = document.querySelector(".hidden-section-actors");
const body = document.querySelector("body");
const footer = document.querySelector(".footer");
const navlinks = document.querySelector("nav");
let URL;
let movie_id;
let index = "";
let curPhoto = "";

// Functions

//checks which key was clicked ,if it is enter key calles generateMovies to render movie posters
search_btn.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    hideContent.style.display = "none";
    generateMovies();
  }
});

seeAll_topPicks.addEventListener("click", function (e) {
  hideContent.style.display = "none";
  hiddenSectionTop.style.display = "flex";

  hiddenSectionTop.addEventListener("mouseover", function (e) {
    const curPic = e.target;
    curPic.style.transition = "transform 0.4s ease-in-out";
    if (curPic.classList.contains("pop_img"))
      curPic.style.transform = `translate(${2}px, ${-5}px)`;
  });
  hiddenSectionTop.addEventListener("mouseout", function (e) {
    const curPic = e.target;

    curPic.style.transform = `translate(${0}px, ${0}px)`;
  });
});

seeAll_favorites.addEventListener("click", function (e) {
  console.log("yes");
  hideContent.style.display = "none";
  hiddenSectionFavorites.style.display = "flex";

  hiddenSectionFavorites.addEventListener("mouseover", function (e) {
    const curPic = e.target;
    curPic.style.transition = "transform 0.4s ease-in-out";
    if (curPic.classList.contains("fan_favorites_img"))
      curPic.style.transform = `translate(${2}px, ${-5}px)`;
  });
  hiddenSectionFavorites.addEventListener("mouseout", function (e) {
    const curPic = e.target;

    curPic.style.transform = `translate(${0}px, ${0}px)`;
  });
});

seeAll_actores.addEventListener("click", function (e) {
  console.log("yes");
  hideContent.style.display = "none";
  hiddenSectionActors.style.display = "flex";

  hiddenSectionActors.addEventListener("mouseover", function (e) {
    const curPic = e.target;
    //console.log(curPic);
    curPic.style.transition = "transform 0.4s ";
    if (curPic.classList.contains("actors_img")) {
      curPic.style.transform = `translate(${2}px, ${-5}px)`;
      // const markup = `<div class="actor_name"><p >${curPic.classList[1]} ${curPic.classList[2]}</p></div>`;
      // console.log(markup);
      // curPic.insertAdjacentHTML("beforeend", markup);
    }

    curPic.addEventListener("mouseout", function (e) {
      const curPic = e.target;
      //  console.log(curPic.firstElementChild.innerHTML);
      // curPic.firstElementChild.innerHTML = "";
      //console.log(curPic.firstElementChild.innerHTML);
      curPic.style.transform = `translate(${0}px, ${0}px)`;
    });
  });
});

//helper function for data generation with API calls
const getData = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

// takes movies array from getData function, loops through and for each movie renders poster on page
// listens to mouse click on poster and calls openSearchedMovie function to render info and than show overlay with mouse hovering
const generateMovies = async function () {
  searchedMoviesContainer.innerHTML = "";
  const user_input = document.querySelector("input").value;
  const movies = await getData(`${ENDPOINT}${user_input}`);
  let count = 0;
  movies.results.forEach((movie, i) => {
    if (!movie.poster_path || !movie.vote_average || !movie.backdrop_path)
      return;
    count++;

    const markup = `
        <section class="sometest">
             <img src="${IMG_PATH}${movie.poster_path}" id='${count}' class="searched_movie_img ${movie.id} ${count} ${i}" >      
        </section>
    `;

    searchedMoviesContainer.insertAdjacentHTML("beforeend", markup);
    document.addEventListener("mouseover", renderOverlay);
  });

  searchedMoviesContainer.addEventListener("click", openSearchedMovie);
};

//generates data with user input, creates play button and overlay markup for each poster and iserts it on each poster
const overlayMarkup = async function () {
  const user_input = document.querySelector("input").value;
  const movies = await getData(`${ENDPOINT}${user_input}`);

  movies.results.forEach((movie, i) => {
    if (Number(movie_id) === movie.id) {
      // let className;
      // if (index % 5 === 4 || index % 5 === 0) {
      //   className = "overlay_left";
      // } else {
      //   className = "overlay_right";
      // }
      // const markup = `
      // <div class='${className}' id='${index}'>
      // <h1>${movie.title}</h1><br>
      // <hr>
      // <h2>Released: </h2>
      // <h3>${movie.release_date}</h3>
      // <br>
      // <h2>Original <br>Language: </h2>
      // <h3>${movie.original_language}</h3>
      // <br>
      // <h2>Overview:</h2>
      // <h2 class='overview'>${movie.overview}</h2><br><br>
      // <section class='bottom'>
      // <h2 class='rating'>Rating: </h2>
      // <h2 class='rating_number'>${movie.vote_average}</h2>
      // </section>
      // </div>
      // `;

      const markup2 = `<button class=' searched_play_btn' id='${index}'><img
      src="icons/icons8-circled-play-100.png"
    /></button>`;

      const curimage = document.getElementById(index);
      console.log(curimage);
      //curimage.insertAdjacentHTML("afterend", markup);
      curimage.insertAdjacentHTML("afterend", markup2);
    }
  });
};

//controls overlay appearance, if mouse is on poster shows overlay info and play button
const renderOverlay = function (e) {
  e.preventDefault();
  const curPoster = e.target;

  //const div = document.querySelector(".overlay_right");
  const videobtn = document.querySelector(".searched_play_btn");
  //const divLeft = document.querySelector(".overlay_left");
  // if (div) {
  //   div.remove();
  //   return;
  // }
  // if (divLeft) {
  //   divLeft.remove();
  // }
  if (videobtn) {
    videobtn.remove();
  }

  if (curPoster.classList.contains("searched_movie_img")) {
    movie_id = curPoster.classList[1];
    index = curPoster.id;

    overlayMarkup();
  }
};

// function for clearing content
const init = function () {
  hideContent.style.display = "none";
  hiddenSectionActors.style.display = "none";
  hiddenSectionFavorites.style.display = "none";
  hiddenSectionTop.style.display = "none";
  sliderContainer.style.display = "none";
  body.style.background = "black";
  footer.style.background = "black";
  navlinks.style.top = `${0}`;

  navlinks.style.margin = `${1}rem`;
};

//identifies which movie poster was clicked, clears content with init function and renders trailers and info with dataAfterClick function
const openSearchedMovie = async function (e) {
  e.preventDefault();
  if (e.target.classList.contains("searched_movie_img")) {
    const movieId = Number(e.target.classList[1]);

    URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c`;
    const user_input = document.querySelector("input").value;

    dataAfterClick(`${ENDPOINT}${user_input}`);
    init();
    curPhoto = e.target.classList[3];
    searchedMoviesContainer.innerHTML = "";
  }
};

//generates data with specific url, makes markup with this data and inserts it in HTML div
const dataAfterClick = async function (url) {
  const data = await getData(url);
  console.log(data, URL);
  let markup;

  const data2 = await getData(URL);

  data.results.forEach((movie, i) => {
    if (url === TOP_PICKS || url === FAN_FAVORITES) {
      console.log("tops or ran");
      markup = `
      <div class='container_play_trailer'>
        <video poster="${IMG_PATH}${movie.poster_path}" >
            <source src="#" type="video/mp4" />
        </video> 
        <img class="play__btn2 second_trailer" src="icons/icons8-circled-play-100.png"/>
      </div>
           `;
    } else {
      const key = data2.results[0].key;
      const urlYoutube = `https://www.youtube.com/embed/${key}?autoplay=1`;

      markup = `
      <div class='container_play_trailer'>
         <iframe src=${urlYoutube} allow='autoplay'></iframe>    
      </div>`;
    }

    if (Number(curPhoto) === i) {
      console.log("yes", movie);
      const markup2 = `
      <div>
        <img src="${IMG_PATH}${
        movie.poster_path
      }" class="watch_movie_trailer" />
      </div>
      ${markup}    
     
        <div class="poster_and_info">
          <img src="${IMG_PATH}${movie.poster_path}" />
          <div class="movie_info">
            <h1>${
              movie.original_title ? movie.original_title : movie.name
            }</h1><br/>            
            <h2>
              Released:
              <h3>${
                movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : movie.first_air_date.slice(0, 4)
              }</h3>
            </h2><br/><br/>            
            <h2>Overview:</h2><br/>            
            <h4 class="overview2">
              ${movie.overview}
            </h4><br/><br/>        
              <h2 class="rating2">
                Rating:
                ${movie.vote_average}
              </h2>
          </div>
        </div>
        <div class="overview1"></div>
      `;
      newPageForTrailer.insertAdjacentHTML("afterend", markup2);
    }
  });
};

const renderData = async function (url, className, container) {
  const data = await getData(url);
  let markup;

  data.results.forEach((movie, i) => {
    if (url === ACTORS) {
      // if (!movie.profile_path) return;

      markup = `  
      <section class="sometest">      
               <img src="${IMG_PATH}${movie.profile_path}" id='${i}' class="${className} ${movie.name} imgt" >       
      </section>
               `;
      hiddenSectionActors.insertAdjacentHTML("beforeend", markup);
    }
    if (url !== ACTORS) {
      //if (!movie.poster_path) return;

      markup = `
      <section class="sometest">   
          <img src="${IMG_PATH}${movie.poster_path}" class="${className} ${movie.id} imgt" id='${i}'>
      </section>
   `;

      if (url === TOP_PICKS) {
        hiddenSectionTop.insertAdjacentHTML("beforeend", markup);
        hiddenSectionTop.addEventListener("mouseover", function (e) {
          const curPic = e.target;
          if (curPic.classList.contains(className)) {
            const movieId = Number(e.target.classList[1]);
            URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c`;
          }
        });
      }

      if (url === FAN_FAVORITES) {
        console.log("fan f");
        hiddenSectionFavorites.insertAdjacentHTML("beforeend", markup);
        hiddenSectionFavorites.addEventListener("mouseover", function (e) {
          const curPic = e.target;
          if (curPic.classList.contains(className)) {
            const movieId = Number(e.target.classList[1]);
            URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c`;
          }
        });
      }
    }

    if (i < 5) {
      container.insertAdjacentHTML("beforeend", markup);
    }
  });

  container.addEventListener("mouseover", function (e) {
    const curPic = e.target;
    console.log(curPic);
    if (curPic.classList.contains(className)) {
      console.log(curPic, "img???");
      if (url !== ACTORS) {
        const movieId = Number(e.target.classList[1]);
        URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=7ce2aea09f71d24f0fd95f34a4fb2c9c`;
        markup = `<button class=' searched_play_btn' id='${index}'><img
        src="icons/icons8-circled-play-100.png"
      /></button>`;
      }

      if (url === ACTORS) {
        const fullName = `${curPic.classList[1]} ${curPic.classList[2]}`;
        markup = `
                      <div class='actors_name'><h2>${fullName}</h2></div>
               `;
      }

      curPic.insertAdjacentHTML("afterend", markup);
    }
  });

  container.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains(className)) {
      if (url !== ACTORS) {
        const videobtn = document.querySelector(".searched_play_btn");

        if (videobtn) {
          videobtn.remove();
        }
      } else {
        const videobtn = document.querySelector(".actors_name");

        if (videobtn) {
          videobtn.remove();
        }
      }
    }
  });

  // if (url === TOP_PICKS)
  //   littleSlider(0, ".parent_container", topPicksContainer);
  // if (url === FAN_FAVORITES)
  //   littleSlider(1, ".parent_container2", fanFavoritesContainer);
  // if (url === ACTORS) littleSlider(2, ".parent_container3", actorsContainer);
};

renderData(TOP_PICKS, "pop_img", topPicksContainer);
//renderData(TOP_PICKS, "pop_img", hiddenSectionTop);
renderData(FAN_FAVORITES, "fan_favorites_img", fanFavoritesContainer);
renderData(ACTORS, "actors_img", actorsContainer);

// little sliders
// const littleSlider = function (i, container, parent_container) {
//   const slides = document.querySelectorAll(`${container} img`);
//   const btnLeft = document.querySelectorAll(".left_arrow");
//   const btnRight = document.querySelectorAll(".right_arrow");
//   let curSlide = 0;

//   const imgSize = slides[0].clientWidth;
//   const containerSize = topPicksContainer.clientWidth;
//   const maxSlides = parseInt(containerSize / imgSize);
//   console.log(parseInt(containerSize / imgSize));
//   // btnLeft[i].style.color = "gray";

//   const nextSlide = function () {
//     if (curSlide > 10) return;
//     //if((containerSize / imgSize) % 0)
//     curSlide += maxSlides;
//     console.log(curSlide);
//     // if (curSlide === 12) {
//     //   btnRight[i].style.color = "gray";
//     // }

//     btnLeft[i].style.color = "black";
//     parent_container.style.transition = "transform 0.4s ease-in-out";

//     parent_container.style.transform = `translateX(-${imgSize * curSlide}px)`;
//   };

//   const prevSlide = function () {
//     if (curSlide === 0) return;
//     //console.log(curSlide);
//     // if (curSlide === 4) {
//     //   btnLeft[i].style.color = "gray";
//     // }
//     parent_container.style.transition = "transform 0.4s ease-in-out";
//     btnRight[i].style.color = "black";
//     curSlide -= maxSlides;
//     parent_container.style.transform = `translateX(-${imgSize * curSlide}px)`;
//   };

//   btnRight[i].addEventListener("click", nextSlide);
//   btnLeft[i].addEventListener("click", prevSlide);
// };

// main slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__arrow--left");
  const btnRight = document.querySelector(".slider__arrow--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};
slider();

//callback function, changes location for web page according to the click on main slider
const playMainTrailer = function (e) {
  if (
    !(
      e.target.classList.contains("play__btn") ||
      e.target.classList.contains("movie_name")
    )
  )
    return;

  if (e.target.classList.contains("first_trailer")) {
    window.open("trailer1.html", "_blank");
  }

  if (e.target.classList.contains("second_trailer")) {
    window.open("trailer2.html", "_blank");
  }

  if (e.target.classList.contains("third_trailer")) {
    window.open("trailer3.html", "_blank");
  }
};

//callback function, hides all content and calls dataAfterClick function, which renders movie  poster and info
const showMovieInfo = function (e) {
  console.log(e.target);
  if (
    e.target.classList.contains("pop_img") ||
    e.target.classList.contains("fan_favorites_img")
  ) {
    curPhoto = e.target.id;
    console.log(curPhoto);
    init();
    console.log(this);
    dataAfterClick(this);
  } else {
    return;
  }
};

// Event steners ............................................................................................

//in main slider on click on movie name/play button generates movie trailer and info  on new page
sliderContainer.addEventListener("click", playMainTrailer);

//in little sliders on click on movie poster generates movie poster and info  on new page
topPicksContainer.addEventListener("click", showMovieInfo.bind(TOP_PICKS));
fanFavoritesContainer.addEventListener(
  "click",
  showMovieInfo.bind(FAN_FAVORITES)
);
hiddenSectionTop.addEventListener("click", showMovieInfo.bind(TOP_PICKS));
hiddenSectionFavorites.addEventListener(
  "click",
  showMovieInfo.bind(FAN_FAVORITES)
);
