function getApi(){
    requestPotd = `https://api.nasa.gov/insight_weather/?api_key=1EJeSetyiMaPkE6wHYbMaV4RwY0WwDNcCJ2ELejm&feedtype=json&ver=1.0`;
    fetch(requestPotd)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    });
}
getApi();