// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nytimeKey = exports.tmdbKey = exports.omdbKey = exports.imdbKey = exports.newsKey = void 0;
const newsKey = '33e57662681e463aa7c9b00c00e6d8f1';
exports.newsKey = newsKey;
const imdbKey = '695a3da407msh2b287ebca3f5ba2p15ffcdjsn23dcf695e873';
exports.imdbKey = imdbKey;
const omdbKey = 'de948a4b';
exports.omdbKey = omdbKey;
const tmdbKey = 'ff8faf4a02c091377dea9ed8d8db2c79';
exports.tmdbKey = tmdbKey;
const nytimeKey = 'CAjG768Tj9tZz6cGQgMsnhuJivIYGaar';
exports.nytimeKey = nytimeKey;
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _keys = require("./keys.js");

/*
  Please add all Javascript code to this file.
*/
//Keys
//Function for Reddit API to be used with onClick
function reddit() {
  // Reddit API with Proxy
  let apiCall = fetch('https://cors.bridged.cc/https://www.reddit.com/top.json');
  apiCall.then(res => res.json()).then(results => {
    results.data.children.forEach(function (result) {
      console.log(result.data);
      let article = document.createElement('article');
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
      document.getElementById('main').appendChild(article);
      document.addEventListener('click', function (event) {
        constructModalContent(event);
      });
    });
  }).catch(err => console.log(err));
}

function newsAPI() {
  // News API
  let apiCall = fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${"33e57662681e463aa7c9b00c00e6d8f1"}`);
  apiCall.then(res => res.json()).then(results => {
    console.log(results.articles);
    results.articles.forEach(function (result) {
      let article = document.createElement('article');
      article.innerHTML = `
        <article class="article">
          <section class="featuredImage">
            <img src="${result.urlToImage}" alt="" />
          </section>
          <section class="articleContent">
              <a href="${result.url}" target="_blank"><h3>${result.title}</h3></a>
              <h6></br>NEWS API</br></br>Source - ${result.source.name}</br></br>Author - ${result.author}</h6>
              <button class="modal-btn" 
                data-title="${result.title}" 
                data-img="${result.urlToImage}"
                data-content="${result.description}" 
                data-link="${result.url}" 
                type="button">
                  More
              </button>
          </section>
          <section class="impressions">
            Published:</br>${result.publishedAt}
          </section>
          <div class="clearfix"></div>
        </article>
      `;
      document.getElementById('main').appendChild(article);
      document.addEventListener('click', function (event) {
        constructModalContent(event);
      });
    });
  }).catch(err => console.log(err));
}

function nyTimes() {
  // NY Times Science API
  let apiCall = fetch(`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${"CAjG768Tj9tZz6cGQgMsnhuJivIYGaar"}`);
  apiCall.then(res => res.json()).then(results => {
    console.log(results.results);
    results.results.forEach(function (result) {
      let article = document.createElement('article');
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
      document.getElementById('main').appendChild(article);
      document.addEventListener('click', function (event) {
        constructModalContent(event);
      });
    });
  }).catch(err => console.log(err));
}

function TMDb() {
  // The Movie Database API
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${_keys.tmdbKey}&language=en-US&page=1`).then(res => res.json()).then(results => {
    for (let i = 0; i < results.results.length; i++) {
      fetch("https://api.themoviedb.org/3/movie/" + results.results[i].id + `?api_key=${"ff8faf4a02c091377dea9ed8d8db2c79"}`).then(res => res.json()).then(resulted => {
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
        let article = document.createElement('article');
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
        document.getElementById('main').appendChild(article);
        document.addEventListener('click', function (event) {
          constructModalContent(event);
        });
      });
    }
  }).catch(err => console.log(err));
} //Constructing Modal Content


function constructModalContent(event) {
  if (event.target.classList.value.includes('modal-btn')) {
    document.querySelector("body").style.overflow = 'hidden';
    document.getElementById('popUp').style.display = 'block';
    setTimeout(function () {
      document.getElementById('popUp').classList.remove('loader');
    }, 500);
    document.getElementById('modalInsert').innerHTML = `
      <h1>${event.target.dataset.title}</h1>
      <div><img class="restrictImage" src="${event.target.dataset.img}" alt="" /></div>
      <p>${event.target.dataset.content}</p>   
      <a href="${event.target.dataset.link}" class="popUpAction" target="_blank">Link to article</a>
    `;
  }
} //Hit X to close modal


document.getElementById('close').onclick = function () {
  document.getElementById('popUp').style.display = 'none';
  document.getElementById('popUp').classList.add('loader');
  document.querySelector("body").style.overflow = 'visible';
}; //Sets news source from drop down


function setNewsSource(setSourceFunc, text) {
  document.getElementById('main').innerHTML = ''; //clear out id = "main"

  setSourceFunc();
  document.getElementById('sourceChoice').innerHTML = '';
  document.getElementById('sourceChoice').appendChild(document.createTextNode(text));
} //Clicking Reddit source to populate article list on DOM


document.getElementById('reddit').addEventListener('click', evt => {
  setNewsSource(reddit, ': Reddit');
}); //Clicking NEWS API source to populate article list on DOM

document.getElementById('news').addEventListener('click', evt => {
  setNewsSource(newsAPI, ': News API');
}); //Clicking NYTimes source to populate article list on DOM

document.getElementById('nytimes').addEventListener('click', evt => {
  setNewsSource(nyTimes, ': NY TIMES Science');
}); //Clicking TMDb source to populate article list on DOM

document.getElementById('tmdb').addEventListener('click', evt => {
  setNewsSource(TMDb, ': TMDb Upcoming Movies');
}); //Clicking Feedr to populate all articles list on DOM

document.getElementById('feedR').addEventListener('click', evt => {
  document.getElementById('main').innerHTML = ''; //clear out id = "main"

  setNewsSource(reddit, '');
  setNewsSource(newsAPI, '');
  setNewsSource(nyTimes, '');
  setNewsSource(TMDb, '');
}); //Onload populate all articles list on DOM

window.onload = function () {
  document.getElementById('main').innerHTML = ''; //clear out id = "main"

  setNewsSource(reddit, '');
  setNewsSource(newsAPI, '');
  setNewsSource(nyTimes, '');
  setNewsSource(TMDb, '');
};
},{"./keys.js":"js/keys.js"}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59813" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map