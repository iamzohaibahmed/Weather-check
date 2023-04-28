const inputBox = document.querySelector('.input-box'); // to get the class named .input-box
const searchBtn = document.getElementById('searchBtn'); // to get the ID name searchBtn
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body =document.querySelector('.weather-body'); 

// async because: await expressions are only allowed within async functions
async function checkWeather(city){ 
  const api_key = "88db9f8d96b694f727bbc918a605395d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data =await fetch(`${url}`).then(response => response.json()); // fetch will bring data from the url in from of json and .then applied on that JSON and next we'll convert it(JSON) into string
  // await is used bec we will store all data one time in our weather_data

  if (weather_data.cod === '404'){
    location_not_found.style.display="flex";
    weather_body.style.display= 'none';
    return;
  }

  location_not_found.style.display="none"; 
  weather_body.style.display= 'flex';
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15 )}°C`; //take data from api and will write that in InnerHTML of these variables
  description.innerHTML = `${(weather_data.weather[0].description)}`;
  humidity.innerHTML = `${(weather_data.main.humidity)}%`;
  wind_speed.innerHTML = `${(weather_data.wind.speed)}Km/Hr`;

  switch(weather_data.weather[0].main){
    case 'Clouds' :
      weather_img.src = "./Images/cloud.png";
      break;
    case 'Clear' :
      weather_img.src = "./Images/clear.png";
      break;
    case 'Rain' :
      weather_img.src = "./Images/rain.png";
      break;
    case 'Mist' :
      weather_img.src = "./Images/mist.png";
      break;
    case 'Snow' :
      weather_img.src = "./Images/snow.png";
      break;
  }
}

searchBtn.addEventListener('click', ()=>{
  checkWeather(inputBox.value);
});