parcelRequire = (function (e, r, t, n) {
 var i,
  o = "function" == typeof parcelRequire && parcelRequire,
  u = "function" == typeof require && require;
 function f(t, n) {
  if (!r[t]) {
   if (!e[t]) {
    var i = "function" == typeof parcelRequire && parcelRequire;
    if (!n && i) return i(t, !0);
    if (o) return o(t, !0);
    if (u && "string" == typeof t) return u(t);
    var c = new Error("Cannot find module '" + t + "'");
    throw ((c.code = "MODULE_NOT_FOUND"), c);
   }
   (p.resolve = function (r) {
    return e[t][1][r] || r;
   }),
    (p.cache = {});
   var l = (r[t] = new f.Module(t));
   e[t][0].call(l.exports, p, l, l.exports, this);
  }
  return r[t].exports;
  function p(e) {
   return f(p.resolve(e));
  }
 }
 (f.isParcelRequire = !0),
  (f.Module = function (e) {
   (this.id = e), (this.bundle = f), (this.exports = {});
  }),
  (f.modules = e),
  (f.cache = r),
  (f.parent = o),
  (f.register = function (r, t) {
   e[r] = [
    function (e, r) {
     r.exports = t;
    },
    {},
   ];
  });
 for (var c = 0; c < t.length; c++)
  try {
   f(t[c]);
  } catch (e) {
   i || (i = e);
  }
 if (t.length) {
  var l = f(t[t.length - 1]);
  "object" == typeof exports && "undefined" != typeof module
   ? (module.exports = l)
   : "function" == typeof define && define.amd
   ? define(function () {
      return l;
     })
   : n && (this[n] = l);
 }
 if (((parcelRequire = f), i)) throw i;
 return f;
})(
 {
  IvEG: [
   function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 }),
     (exports.nytimeKey =
      exports.tmdbKey =
      exports.omdbKey =
      exports.imdbKey =
      exports.newsKey =
       void 0);
    const e = "33e57662681e463aa7c9b00c00e6d8f1";
    exports.newsKey = e;
    const t = "695a3da407msh2b287ebca3f5ba2p15ffcdjsn23dcf695e873";
    exports.imdbKey = t;
    const s = "de948a4b";
    exports.omdbKey = s;
    const o = "ff8faf4a02c091377dea9ed8d8db2c79";
    exports.tmdbKey = o;
    const d = "CAjG768Tj9tZz6cGQgMsnhuJivIYGaar";
    exports.nytimeKey = d;
   },
   {},
  ],
  QdeU: [
   function (require, module, exports) {
    "use strict";
    var e = require("./keys.js");
    function t() {
     fetch("https://cors.bridged.cc/https://www.reddit.com/top.json")
      .then((e) => e.json())
      .then((e) => {
       e.data.children.forEach(function (e) {
        console.log(e.data);
        let t = document.createElement("article");
        (t.innerHTML = `\n        <article class="article">\n          <section class="featuredImage">\n            <img src="${e.data.thumbnail}" alt="" />\n          </section>\n          <section class="articleContent">\n              <a href="https://www.reddit.com${e.data.permalink}" target="_blank"><h3>${e.data.title}</h3></a>\n              <h6></br>Reddit</br></br>Category - ${e.data.subreddit}</br></br>Author - ${e.data.author}</h6>\n              <button class="modal-btn" \n                data-title="${e.data.title}" \n                data-img=${e.data.thumbnail}\n                data-content="${e.data.subreddit_name_prefixed}" \n                data-link="https://www.reddit.com${e.data.permalink}" \n                type="button">\n                  More\n              </button>\n          </section>\n          <section class="impressions">\n            Upvotes:</br>${e.data.ups}\n          </section>\n          <div class="clearfix"></div>\n        </article>\n      `),
         document.getElementById("main").appendChild(t),
         document.addEventListener("click", function (e) {
          c(e);
         });
       });
      })
      .catch((e) => console.log(e));
    }
    function n() {
     fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=33e57662681e463aa7c9b00c00e6d8f1"
     )
      .then((e) => e.json())
      .then((e) => {
       console.log(e.articles),
        e.articles.forEach(function (e) {
         let t = document.createElement("article");
         (t.innerHTML = `\n        <article class="article">\n          <section class="featuredImage">\n            <img src="${e.urlToImage}" alt="" />\n          </section>\n          <section class="articleContent">\n              <a href="${e.url}" target="_blank"><h3>${e.title}</h3></a>\n              <h6></br>NEWS API</br></br>Source - ${e.source.name}</br></br>Author - ${e.author}</h6>\n              <button class="modal-btn" \n                data-title="${e.title}" \n                data-img="${e.urlToImage}"\n                data-content="${e.description}" \n                data-link="${e.url}" \n                type="button">\n                  More\n              </button>\n          </section>\n          <section class="impressions">\n            Published:</br>${e.publishedAt}\n          </section>\n          <div class="clearfix"></div>\n        </article>\n      `),
          document.getElementById("main").appendChild(t),
          document.addEventListener("click", function (e) {
           c(e);
          });
        });
      })
      .catch((e) => console.log(e));
    }
    function a() {
     fetch(
      "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=CAjG768Tj9tZz6cGQgMsnhuJivIYGaar"
     )
      .then((e) => e.json())
      .then((e) => {
       console.log(e.results),
        e.results.forEach(function (e) {
         let t = document.createElement("article");
         (t.innerHTML = `\n        <article class="article">\n          <section class="featuredImage">\n            <img src="${e.multimedia[0].url}" alt="" />\n          </section>\n          <section class="articleContent">\n              <a href="${e.url}" target="_blank"><h3>${e.title}</h3></a>\n              <h6></br>NY TIMES (Science)</br></br>Categroy - ${e.section}</br></br>Author - ${e.byline}</h6>\n              <button class="modal-btn" \n                data-title="${e.title}" \n                data-img="${e.multimedia[0].url}"\n                data-content="${e.abstract}" \n                data-link="${e.url}" \n                type="button">\n                  More\n              </button>\n          </section>\n          <section class="impressions">\n            Published:</br>${e.created_date}\n          </section>\n          <div class="clearfix"></div>\n        </article>\n      `),
          document.getElementById("main").appendChild(t),
          document.addEventListener("click", function (e) {
           c(e);
          });
        });
      })
      .catch((e) => console.log(e));
    }
    function o() {
     fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${e.tmdbKey}&language=en-US&page=1`
     )
      .then((e) => e.json())
      .then((e) => {
       for (let t = 0; t < e.results.length; t++)
        fetch(
         "https://api.themoviedb.org/3/movie/" +
          e.results[t].id +
          "?api_key=ff8faf4a02c091377dea9ed8d8db2c79"
        )
         .then((e) => e.json())
         .then((e) => {
          console.log(e);
          let t = [];
          for (let o = 0; o < e.production_companies.length; o++)
           console.log(e.production_companies[o].name),
            t.push(e.production_companies[o].name);
          console.log(t);
          let n = [];
          for (let o = 0; o < e.genres.length; o++)
           console.log(e.genres[o].name), n.push(e.genres[o].name);
          console.log(n);
          let a = document.createElement("article");
          (a.innerHTML = `\n          <article class="article">\n            <section class="featuredImage">\n              <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" alt="" />\n            </section>\n            <section class="articleContent">\n              <a href="${e.homepage}" target="_blank"><h3>${e.original_title}</h3></a>\n              <h6></br>The Movie Database</br></br>Genre - ${n}</br></br>Production Companies:</br>${t}</h6>\n              <button class="modal-btn" \n              data-title="${e.original_title}" \n              data-img="https://image.tmdb.org/t/p/w500${e.poster_path}"\n              data-content="${e.overview}" \n              data-link="${e.homepage}" \n              type="button">\n                More\n            </button>\n            </section>\n            <section class="impressions">\n              Release Date:</br>${e.release_date}\n            </section>\n            <div class="clearfix"></div>\n          </article>\n        `),
           document.getElementById("main").appendChild(a),
           document.addEventListener("click", function (e) {
            c(e);
           });
         });
      })
      .catch((e) => console.log(e));
    }
    function c(e) {
     e.target.classList.value.includes("modal-btn") &&
      ((document.querySelector("body").style.overflow = "hidden"),
      (document.getElementById("popUp").style.display = "block"),
      setTimeout(function () {
       document.getElementById("popUp").classList.remove("loader");
      }, 500),
      (document.getElementById(
       "modalInsert"
      ).innerHTML = `\n      <h1>${e.target.dataset.title}</h1>\n      <div><img class="restrictImage" src="${e.target.dataset.img}" alt="" /></div>\n      <p>${e.target.dataset.content}</p>   \n      <a href="${e.target.dataset.link}" class="popUpAction" target="_blank">Link to article</a>\n    `));
    }
    function i(e, t) {
     (document.getElementById("main").innerHTML = ""),
      e(),
      (document.getElementById("sourceChoice").innerHTML = ""),
      document
       .getElementById("sourceChoice")
       .appendChild(document.createTextNode(t));
    }
    (document.getElementById("close").onclick = function () {
     (document.getElementById("popUp").style.display = "none"),
      document.getElementById("popUp").classList.add("loader"),
      (document.querySelector("body").style.overflow = "visible");
    }),
     document.getElementById("reddit").addEventListener("click", (e) => {
      i(t, ": Reddit");
     }),
     document.getElementById("news").addEventListener("click", (e) => {
      i(n, ": News API");
     }),
     document.getElementById("nytimes").addEventListener("click", (e) => {
      i(a, ": NY TIMES Science");
     }),
     document.getElementById("tmdb").addEventListener("click", (e) => {
      i(o, ": TMDb Upcoming Movies");
     }),
     document.getElementById("feedR").addEventListener("click", (e) => {
      (document.getElementById("main").innerHTML = ""),
       i(t, ""),
       i(n, ""),
       i(a, ""),
       i(o, "");
     }),
     (window.onload = function () {
      (document.getElementById("main").innerHTML = ""),
       i(t, ""),
       i(n, ""),
       i(a, ""),
       i(o, "");
     });
   },
   { "./keys.js": "IvEG" },
  ],
 },
 {},
 ["QdeU"],
 null
);
//# sourceMappingURL=app.7cb7b68f.js.map
