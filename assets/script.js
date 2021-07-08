var asteroidUrl = "";
var marsPictureUrl =
  "https://api.nasa.gov/planetary/apod?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&thumbs=True&date=";
var searchBar = document.getElementById("searchBar");
var todayDate = new Date().toISOString().slice(0, 10);
var searchButton = document.getElementById("searchButton");
var main = document.getElementsByTagName("main")[0];
var container = document.getElementsByClassName("content")[0];
var urlImage = document.getElementById("POTD");
var searchBar2 = document.getElementById("searchBar2")
var secondSearch = document.querySelector(".secondSearch");
dateArray = [];


function localStore(){
  localStorage.setItem("dateArray",JSON.stringify(dateArray));
  storedDates = localStorage.getItem("dateArray");
  storedArr = [];
  for(i=0;i<storedDates.length;i++){
      if(!storedArr.includes(date)){
          btn = document.createElement("button");
          btn.innerHTML = date;
          btn.setAttribute('class','saved');
          btn.setAttribute('id', date);
          btn.addEventListener("click",function(event){
            event.preventDefault();
            getPictureSecond(date);
          });
          document.querySelector(".buttonHolder").appendChild(btn);
          storedArr.push(date);
      }else{
          continue;
      }
  }
}
searchBar.setAttribute("max", todayDate);
searchButton.addEventListener("click", function(){
  date = searchBar.value;
  if(!dateArray.includes(date)){
    dateArray.push(date);
    localStore(date);
  }else{
    console.log("date has already been entered");
  }
  getPictureOfTheDay();
});
secondSearch.addEventListener("click", function(event){
  event.preventDefault();
  date = searchBar2.value;
  console.log("this is working")
  if(!dateArray.includes(date)){
    dateArray.push(date);
    localStore(date);
  }else{
    console.log("date has already been entered");
  }
  getPictureSecond();
});
function getPictureSecond(){
  hideStartPage();
  asteroidUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm`;
  fetch(marsPictureUrl + date)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
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
      getAsteroidUrl2();
      //POTD
    });
  
}

var blueColumn = document.querySelector(".blue-column");

var descript = document.getElementById("desciptionPOTD");
var potdAuthor = document.getElementById("author");
var potdTitle = document.getElementById("title");


searchBar2.setAttribute("max",todayDate);
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
function getAsteroidUrl2() {
  hideStartPage();
  fetch(asteroidUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      blueColumn.innerHTML = `
      <h1>Asteroid closest to Earth!</h1>
      <p> Name: ${data.near_earth_objects[date][0].name}</p>
      <p> Velocity: ${parseInt(
        data.near_earth_objects[date][0].close_approach_data[0]
          .relative_velocity.miles_per_hour
      )} miles per hour</p>
      <p> Approach Date: ${
        data.near_earth_objects[date][0].close_approach_data[0]
          .close_approach_date_full
      }</p>
      <p> Size: ${parseInt(
        data.near_earth_objects[date][0].estimated_diameter.meters
          .estimated_diameter_max
      )} Meters</p>
      `;
      console.log(data.near_earth_objects[date][0]);
    });
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

