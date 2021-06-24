/*
  Please add all Javascript code to this file.
*/

//Keys
// import { newsKey } from './keys.js';
import { nytimeKey } from "./keys.js";
import { tmdbKey } from "./keys.js";

//Function for Reddit API to be used with onClick
function reddit() {
 // Reddit API with Proxy
 let apiCall = fetch("https://cors.bridged.cc/https://www.reddit.com/top.json");
 apiCall
  .then((res) => res.json())
  .then((results) => {
   results.data.children.forEach(function (result) {
    console.log(result.data);

    let article = document.createElement("article");
    article.innerHTML = `
        <article class="article">
          <section class="featuredImage">
            <img src="${result.data.thumbnail}" alt="" />
          </section>
          <section class="articleContent">
              <a href="https://www.reddit.com${result.data.permalink}" target="_blank"><h3>${result.data.title}</h3></a>
              <h6></br>Reddit</br></br>Category - ${result.data.subreddit}</br></br>Author - ${result.data.author}</h6>
              <button class="modal-btn" 
                data-title="${result.data.title}" 
                data-img=${result.data.thumbnail}
                data-content="${result.data.subreddit_name_prefixed}" 
                data-link="https://www.reddit.com${result.data.permalink}" 
                type="button">
                  More
              </button>
          </section>
          <section class="impressions">
            Upvotes:</br>${result.data.ups}
          </section>
          <div class="clearfix"></div>
        </article>
      `;
    document.getElementById("main").appendChild(article);

    document.addEventListener("click", function (event) {
     constructModalContent(event);
    });
   });
  })
  .catch((err) => console.log(err));
}

// function newsAPI() {
//   // News API
//   let apiCall = fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsKey}`);
//   apiCall
//   .then(res => res.json())
//   .then(results => {
//     console.log(results.articles);
//     results.articles.forEach(function(result){

//       let article = document.createElement('article');
//       article.innerHTML = `
//         <article class="article">
//           <section class="featuredImage">
//             <img src="${result.urlToImage}" alt="" />
//           </section>
//           <section class="articleContent">
//               <a href="${result.url}" target="_blank"><h3>${result.title}</h3></a>
//               <h6></br>NEWS API</br></br>Source - ${result.source.name}</br></br>Author - ${result.author}</h6>
//               <button class="modal-btn"
//                 data-title="${result.title}"
//                 data-img="${result.urlToImage}"
//                 data-content="${result.description}"
//                 data-link="${result.url}"
//                 type="button">
//                   More
//               </button>
//           </section>
//           <section class="impressions">
//             Published:</br>${result.publishedAt}
//           </section>
//           <div class="clearfix"></div>
//         </article>
//       `;
//       document.getElementById('main').appendChild(article);

//       document.addEventListener('click', function(event) {
//         constructModalContent(event);
//       });
//     });
//   })
//   .catch(err => console.log(err));
// }

function nyTimes() {
 // NY Times Science API
 let apiCall = fetch(
  `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${nytimeKey}`
 );
 apiCall
  .then((res) => res.json())
  .then((results) => {
   console.log(results.results);
   results.results.forEach(function (result) {
    let article = document.createElement("article");
    article.innerHTML = `
        <article class="article">
          <section class="featuredImage">
            <img src="${result.multimedia[0].url}" alt="" />
          </section>
          <section class="articleContent">
              <a href="${result.url}" target="_blank"><h3>${result.title}</h3></a>
              <h6></br>NY TIMES (Science)</br></br>Categroy - ${result.section}</br></br>Author - ${result.byline}</h6>
              <button class="modal-btn" 
                data-title="${result.title}" 
                data-img="${result.multimedia[0].url}"
                data-content="${result.abstract}" 
                data-link="${result.url}" 
                type="button">
                  More
              </button>
          </section>
          <section class="impressions">
            Published:</br>${result.created_date}
          </section>
          <div class="clearfix"></div>
        </article>
      `;
    document.getElementById("main").appendChild(article);

    document.addEventListener("click", function (event) {
     constructModalContent(event);
    });
   });
  })
  .catch((err) => console.log(err));
}

function TMDb() {
 // The Movie Database API
 fetch(
  `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}&language=en-US&page=1`
 )
  .then((res) => res.json())
  .then((results) => {
   for (let i = 0; i < results.results.length; i++) {
    fetch(
     "https://api.themoviedb.org/3/movie/" +
      results.results[i].id +
      `?api_key=${tmdbKey}`
    )
     .then((res) => res.json())
     .then((resulted) => {
      console.log(resulted);

      let companyArr = [];

      for (let x = 0; x < resulted.production_companies.length; x++) {
       console.log(resulted.production_companies[x].name);
       companyArr.push(resulted.production_companies[x].name);
      }
      console.log(companyArr);

      let genreArr = [];

      for (let g = 0; g < resulted.genres.length; g++) {
       console.log(resulted.genres[g].name);
       genreArr.push(resulted.genres[g].name);
      }
      console.log(genreArr);

      let article = document.createElement("article");
      article.innerHTML = `
          <article class="article">
            <section class="featuredImage">
              <img src="https://image.tmdb.org/t/p/w500${resulted.poster_path}" alt="" />
            </section>
            <section class="articleContent">
              <a href="${resulted.homepage}" target="_blank"><h3>${resulted.original_title}</h3></a>
              <h6></br>The Movie Database</br></br>Genre - ${genreArr}</br></br>Production Companies:</br>${companyArr}</h6>
              <button class="modal-btn" 
              data-title="${resulted.original_title}" 
              data-img="https://image.tmdb.org/t/p/w500${resulted.poster_path}"
              data-content="${resulted.overview}" 
              data-link="${resulted.homepage}" 
              type="button">
                More
            </button>
            </section>
            <section class="impressions">
              Release Date:</br>${resulted.release_date}
            </section>
            <div class="clearfix"></div>
          </article>
        `;
      document.getElementById("main").appendChild(article);

      document.addEventListener("click", function (event) {
       constructModalContent(event);
      });
     });
   }
  })
  .catch((err) => console.log(err));
}

//Constructing Modal Content
function constructModalContent(event) {
 if (event.target.classList.value.includes("modal-btn")) {
  document.querySelector("body").style.overflow = "hidden";
  document.getElementById("popUp").style.display = "block";
  setTimeout(function () {
   document.getElementById("popUp").classList.remove("loader");
  }, 500);
  document.getElementById("modalInsert").innerHTML = `
      <h1>${event.target.dataset.title}</h1>
      <div><img class="restrictImage" src="${event.target.dataset.img}" alt="" /></div>
      <p>${event.target.dataset.content}</p>   
      <a href="${event.target.dataset.link}" class="popUpAction" target="_blank">Link to article</a>
    `;
 }
}

//Hit X to close modal
document.getElementById("close").onclick = function () {
 document.getElementById("popUp").style.display = "none";
 document.getElementById("popUp").classList.add("loader");
 document.querySelector("body").style.overflow = "visible";
};

//Sets news source from drop down
function setNewsSource(setSourceFunc, text) {
 document.getElementById("main").innerHTML = ""; //clear out id = "main"
 setSourceFunc();
 document.getElementById("sourceChoice").innerHTML = "";
 document
  .getElementById("sourceChoice")
  .appendChild(document.createTextNode(text));
}

//Clicking Reddit source to populate article list on DOM
document.getElementById("reddit").addEventListener("click", (evt) => {
 setNewsSource(reddit, ": Reddit");
});

//Clicking NEWS API source to populate article list on DOM (Corrs Issue)
// document.getElementById('news').addEventListener('click', (evt) => {
//   setNewsSource(newsAPI, ': News API');
// });

//Clicking NYTimes source to populate article list on DOM
document.getElementById("nytimes").addEventListener("click", (evt) => {
 setNewsSource(nyTimes, ": NY TIMES Science");
});

//Clicking TMDb source to populate article list on DOM
document.getElementById("tmdb").addEventListener("click", (evt) => {
 setNewsSource(TMDb, ": TMDb Upcoming Movies");
});

//Clicking Feedr to populate all articles list on DOM
document.getElementById("feedR").addEventListener("click", (evt) => {
 document.getElementById("main").innerHTML = ""; //clear out id = "main"
 setNewsSource(reddit, "");
 // setNewsSource(newsAPI, '');
 setNewsSource(nyTimes, "");
 setNewsSource(TMDb, "");
});

//Onload populate all articles list on DOM
window.onload = function () {
 document.getElementById("main").innerHTML = ""; //clear out id = "main"
 setNewsSource(reddit, "");
 // setNewsSource(newsAPI, '');
 setNewsSource(nyTimes, "");
 setNewsSource(TMDb, "");
};
