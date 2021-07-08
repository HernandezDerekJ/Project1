var marsPictureUrl =
  "https://api.nasa.gov/planetary/apod?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&thumbs=True&date=";
var searchBar = document.getElementById("searchBar");
var todayDate = new Date().toISOString().slice(0, 10);
var searchButton = document.getElementById("searchButton");
var main = document.getElementsByTagName("main")[0];
var container = document.getElementsByClassName("content")[0];
var urlImage = document.getElementById("POTD");
var descript = document.getElementById("desciptionPOTD");
var potdAuthor = document.getElementById("author");
var potdTitle = document.getElementById("title");

console.log(todayDate);

searchBar.setAttribute("max", todayDate);
searchButton.addEventListener("click", getPictureOfTheDay);
function getPictureOfTheDay() {
  hideStartPage();
  fetch(marsPictureUrl + searchBar.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      hideStartPage();
      image = data.url;
      console.log(data.url);
      //POTD Setting
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
      //POTD
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
function loadPage(){
  $('#pageContain').show();
  $('.row').show();
  $('.column').show();

}
function checkUndefined(x){
  if(x){
    return true
  }
  return false;
}