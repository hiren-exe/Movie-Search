const movieDetails = document.querySelector(".movie-details");
const movieTitle = document.querySelector("#title");
const movieReleaseDate = document.querySelector("#release-date");
const movieTime = document.querySelector("#time");
const movieGenre = document.querySelector("#genre");
const movieDirector = document.querySelector("#director");
const movieRating = document.querySelector("#rating");
const moviePlot = document.querySelector("#plot");
const genreCategories = document.querySelector(".genre-categories");
const actorsNames = document.querySelector(".actors-names");
const movieBtn = document.querySelector("#movie-btn");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
window.SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

let grammar = "#JSGF V1.0;";
let rec = new window.SpeechRecognition();
let grammarList = new window.SpeechGrammarList();

grammarList.addFromString(grammar, 1);
rec.grammars = grammarList;

rec.lang = "en-US";
rec.continuous = false;
rec.interimResults = false;

onSpeak = (e) => {
  const movieSayed = e.results[0][0].transcript;
  showMovieDetails(movieSayed);
};

async function showMovieDetails(movie) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=e04ba3bc&t=${movie}`);
  const data = await res.json();

  movieDetails.classList.add("showMovie");

  const gen = data.Genre.split(",");
  const act = data.Actors.split(",");

  gen.forEach((genre) => {
    const span = document.createElement("span");
    span.innerText = `${genre}`;
    genreCategories.appendChild(span);
  });

  act.forEach((actor) => {
    const span = document.createElement("span");
    span.innerText = `${actor}`;
    actorsNames.appendChild(span);
  });

  movieTitle.innerText = `"${data.Title}"`;
  movieReleaseDate.innerText = `${data.Released}`;
  movieTime.innerText = `${data.Runtime}`;
  movieDirector.innerText = `${data.Director}`;
  movieRating.innerHTML = `<strong>${data.imdbRating}</strong>`;
  moviePlot.innerText = `${data.Plot}`;
}

// Start recognition on movie button click
movieBtn.addEventListener("click", () => {
  rec.start();
});

// Speak result
rec.addEventListener("result", onSpeak);
