
var marsPictureUrl =
  "https://api.nasa.gov/planetary/apod?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&thumbs=True&date=";
var searchBar = document.getElementById("searchBar");
var todayDate = new Date().toISOString().slice(0, 10);
var searchButton = document.getElementById("searchButton");
var main = document.getElementsByTagName("main")[0];
var container = document.getElementsByClassName("content")[0];
var urlImage = document.getElementById("backgroundImage");
console.log(todayDate);

searchBar.setAttribute("max", todayDate);
searchButton.addEventListener("click", getPictureOfTheDay);
displayStartPage();
function getPictureOfTheDay() {
  fetch(marsPictureUrl + searchBar.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      hideStartPage();
      image = data.url;
      console.log(data.url);
      urlImage.style.backgroundImage = "url("+image+")"
    });
}

function displayStartPage() {
  //document.body.style.backgroundImage = "url('./assets/images/mars-67522_1920.jpg')";
}

function hideStartPage() {
  container.style.display = "none";
  urlImage.style.backgroundImage = "none";
}
