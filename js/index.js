let name_city = document.getElementById('name_city');
let lat = document.getElementById('lat');
let tem = document.getElementById('temperature');
let lon = document.getElementById('lon');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let Arrow = document.getElementById('Arrow');
let btn = document.getElementById('btn');
let btn_celcius = document.getElementById('btn_celcius');
let btn_farenheit = document.getElementById('btn_farenheit');
let btn_kilometro = document.getElementById('btn_kilometro');
let btn_milla = document.getElementById('btn_milla');


const options = {
	method: 'GET',
	headers: {
      	'X-RapidAPI-Key': 'fdacf5df39mshb4d7c9e9d953bb5p1413c0jsne64f642be0c2',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

btn.addEventListener("click", () =>{
  weather();
});

function weather () {
 let select_city = document.getElementById('select_city').value;
 let enter_city = document.getElementById('enter_city').value;
  if (enter_city === '') {
    var url =`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${select_city}`
  }else {
    var url =`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${enter_city}`
  }
  
  console.log(url)
fetch(url, options)
  .then( response => response.json())
  .then(data => {
    name_city.innerText = data.location.name
    lat.innerText = ` lat: ${data.location.lat}`
    if (temp_celcius === false) {tem.innerText = `${data.current.temp_f}°F`
    }else {tem.innerText = `${data.current.temp_c}°C`}
    lon.innerText = `lon: ${data.location.lon}`
    humidity.innerText = `humidity: ${data.current.humidity}%`
    if (speed_kilometro === false) {wind.innerText = `wind_speed: ${data.current.wind_mph}mph`}
    else {wind.innerText = `wind_speed: ${data.current.wind_kph}km`}
    let deg = `${data.current.wind_degree}deg`;
    Arrow.style.transform = `rotate(${deg})`
    if (data.current.condition.text === 'Sunny' || data.current.condition.text === 'Clear') {
       let img = document.getElementById('img').src=`assets/Soul.png`
       }
       else if (data.current.condition.text === 'Partly cloudy' || data.current.condition.text === 'Overcast'){
       let img = document.getElementById('img').src=`assets/Cloud.png`
       }
       else if (data.current.condition.text === 'Moderate or heavy rain with thunder' || data.current.condition.text === 'Light rain') {
       let img = document.getElementById('img').src=`assets/Rain.png`
    }
   else if (data.current.condition.text === 'Storm' || 'Thundery outbreaks possible') {
    let img = document.getElementById('img').src=`assets/storm.png`
    }
})
.catch(error => console.log(error));  
}

var temp_celcius = false;
btn_farenheit.style.background ='#410093';
var speed_kilometro = false;
btn_milla.style.background = '#410093';

btn_celcius.addEventListener('click', () => {
  temp_celcius = true;
  btn_celcius.style.background ='#410093';
  btn_farenheit.style.background = '#1AB7EA';
});

btn_farenheit.addEventListener('click', () => {
  temp_celcius = false;
  btn_celcius.style.background ='#1AB7EA';
  btn_farenheit.style.background = '#410093';
})

btn_kilometro.addEventListener('click', () => {
  speed_kilometro = true;
  btn_kilometro.style.background = '#410093';
  btn_milla.style.background = '#1AB7EA';
});

btn_milla.addEventListener('click', () => {
  speed_kilometro = false;
  btn_kilometro.style.background = '#1AB7EA';
  btn_milla.style.background = '#410093';
});
window.addEventListener('load', () => {
  weather();
});
