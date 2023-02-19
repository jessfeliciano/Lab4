// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const cityTextElement= document.querySelector("cityText");

// App data
const weather = {};

weather.temperature = {
  unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273; 

// const api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cityText=${city}appid=${key}`;
//API KEY="https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid";
const key= "82005d27a116c2880c8f0fcb866998a0";


// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){

//  console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cityText=${city}appid=${key}`);


//insert textbox
const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "container");

const containerHeader = document.createElement("H3");
containerHeader.innerText = "Weather";

const notifications = document.createElement("div");
notifications.setAttribute("class", "notifications");

const weatherContainer = document.createElement("div");
weatherContainer.setAttribute("class", "weather-container");

const weatherIcon = document.createElement("div");
weatherIcon.setAttribute("class","weather-icon");

const iconImage = document.createElement("img");
iconImage.setAttribute("src", "icons/unknown.png");

const temperatureValue = document.createElement("div");
temperatureValue.setAttribute("class", "temperature-value");

const temperatureDescription = document.createElement("div");
temperatureDescription.setAttribute("class", "temperature-description");

const locationDiv = document.createElement("div");
locationDiv.setAttribute("class", "location");

const tempValueParagraph = document.createElement("p");
tempValueParagraph.innerText = `-${weather.temperature.value} °C`;

const tempDescriptionParagraph = document.createElement("p");
tempDescriptionParagraph.innerText = `- `;

const locationParagraph = document.createElement("p");
locationParagraph.innerText = `- `;

containerDiv.appendChild(containerHeader);
containerDiv.appendChild(notifications);
containerDiv.appendChild(weatherContainer);

weatherContainer.appendChild(weatherIcon);
weatherContainer.appendChild(temperatureValue);
weatherContainer.appendChild(temperatureDescription);
weatherContainer.appendChild(locationDiv);

weatherIcon.appendChild(iconImage);

temperatureValue.appendChild(tempValueParagraph);
temperatureDescription.appendChild(tempDescriptionParagraph);
locationDiv.appendChild(locationParagraph);

document.body.appendChild(containerDiv);

const input = document.createElement("input");
input.setAttribute("id", "city");
input.setAttribute("type", "text");

containerDiv.appendChild(input);

const label = document.createElement("label");
label.setAttribute("for", "city");
label.innerHTML = "City: ";

cityText = document.getElementById("city");
// containerDiv.insertBefore(label, cityText);

cityText = document.getElementById("city");
cityText.setAttribute("placeholder", "Input City here...");

const value = cityText.value;

containerDiv.appendChild(label, cityText);

// Create a button element
const button = document.createElement('button')

// Set the button text to 'Can you click me?'
button.innerText = 'SUBMIT'

// Attach the "click" event to your button
button.addEventListener('click', () => {
  // When there is a "click"
  // it shows an alert in the browser
  alert('You clicked SUBMIT!')
})

containerDiv.appendChild(button)

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
       weather.country = data.sys.country;
          
      })
      .then(function(){
          displayWeather();
      });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  cityText.innerHTML='$weather.city'
}

// C to F conversion
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  
  if(weather.temperature.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);
      
      tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
      tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius"
      
  }
});
