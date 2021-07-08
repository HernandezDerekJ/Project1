var marsPictureUrl =
  "https://api.nasa.gov/planetary/apod?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&thumbs=True&date=";
var searchBar = document.getElementById("searchBar");
var todayDate = new Date().toISOString().slice(0, 10);
var searchButton = document.getElementById("searchButton");
var main = document.getElementsByTagName("main")[0];
var container = document.getElementsByClassName("content")[0];
var urlImage = document.getElementById("POTD");
var secondSearch = document.querySelector(".secondSearch");
dateArray = [];

function localStore(){
  localStorage.setItem("dateArray",JSON.stringify(dateArray));
  storedDates = localStorage.getItem("dateArray");
  for(i=0;i<storedDates.length;i++){
      if(!storedDates.includes(date)){
          btn = document.createElement("button");
          btn.innerHTML = date;
          btn.setAttribute('class','saved');
          document.querySelector(".buttonHolder").appendChild(btn);
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
secondSearch.addEventListener("click", function(){
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
  fetch(marsPictureUrl + searchBar2.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      image = data.url;
      urlImage.style.backgroundImage = "url("+image+")";
    });
}
function getPictureOfTheDay() {
  hideStartPage();
  fetch(marsPictureUrl + searchBar.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      hideStartPage();
      image = data.url;
      urlImage.style.backgroundImage = "url("+image+")"
      document.querySelector(".sidenav").style.visibility = "visible";
    });

}


function hideStartPage() {
  container.style.display = "none";
  urlImage.style.backgroundImage = "visable";
  loadPage();
}
function loadPage(){
  $('#pageContain').show();
  $('.row').show();
  $('.column').show();

}


