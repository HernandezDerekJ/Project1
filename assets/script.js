var asteroidUrl = "";
var marsPictureUrl =
  "https://api.nasa.gov/planetary/apod?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&thumbs=True&date=";
var searchBar = document.getElementById("searchBar");
var todayDate = new Date().toISOString().slice(0, 10);
var searchButton = document.getElementById("searchButton");
var main = document.getElementsByTagName("main")[0];
var container = document.getElementsByClassName("content")[0];
var urlImage = document.getElementById("POTD");

var blueColumn = document.querySelector(".blue-column");

var descript = document.getElementById("desciptionPOTD");
var potdAuthor = document.getElementById("author");
var potdTitle = document.getElementById("title");



searchBar.setAttribute("max", todayDate);
searchButton.addEventListener("click", getPictureOfTheDay);

function getPictureOfTheDay() {
  hideStartPage();
  asteroidUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${searchBar.value}&end_date=${searchBar.value}&api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm`;
  fetch(marsPictureUrl + searchBar.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      hideStartPage();
      image = data.url;
      console.log(data.url);
      urlImage.style.backgroundImage = "url(" + image + ")";

      descript.innerText  = data.explanation;
      if(checkUndefined(data.title) ){
        potdTitle.innerHTML = "Author: " + data.title;
      }
      if(checkUndefined(data.copyright) ){
        potdAuthor.innerHTML = "Credit: " + data.copyright
      }
      urlImage.style.backgroundImage = "url("+image+")"
      //POTD Setting
      document.querySelector(".sidenav").style.visibility = "visible";
      getAsteroidUrl();
      //POTD
    });
}

function getAsteroidUrl() {
  hideStartPage();
  fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      blueColumn.innerHTML = `
      <h1>Asteroid closest to Earth!</h1>
      <p> Name: ${data.near_earth_objects[searchBar.value][0].name}</p>
      <p> Velocity: ${parseInt(
        data.near_earth_objects[searchBar.value][0].close_approach_data[0]
          .relative_velocity.miles_per_hour
      )} miles per hour</p>
      <p> Approach Date: ${
        data.near_earth_objects[searchBar.value][0].close_approach_data[0]
          .close_approach_date_full
      }</p>
      <p> Size: ${parseInt(
        data.near_earth_objects[searchBar.value][0].estimated_diameter.meters
          .estimated_diameter_max
      )} Meters</p>
      `;
      console.log(data.near_earth_objects[searchBar.value][0]);
    });
}

function displayStartPage() {
  //document.body.style.backgroundImage = "url('./assets/images/mars-67522_1920.jpg')";
}

function hideStartPage() {
  container.style.display = "none";
  urlImage.style.backgroundImage = "visible";
  loadPage();
}

function loadPage() {
  $("#pageContain").show();
  $(".row").show();
  $(".column").show();
}

function checkUndefined(x){
  if(x){
    return true
  }
  return false;
}

