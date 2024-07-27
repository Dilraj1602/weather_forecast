let autoselect_tab = document.getElementsByClassName('your_weather');
let select_tab = document.getElementsByClassName('search_weather');
let content_tab = document.getElementsByClassName('permision');
let search_tab = document.getElementsByClassName('search');
let cityname = document.getElementById('city');
let dataname = document.getElementsByClassName('city_name')[0];
let mode = document.getElementsByClassName('mode')[0];
let temperature = document.getElementsByClassName('temperature')[0];
let speeddata = document.getElementsByClassName('speeddata')[0];
let humiditydata = document.getElementsByClassName('humiditydata')[0];
let cloudsdata = document.getElementsByClassName('cloudsdata')[0];
const api_key = "b23add06126a5a82e12612a82dd62b9d";
let gif = document.getElementsByClassName('loading')[0];

let permision= document.getElementsByClassName('permision_btn')[0];

let contentdata = document.getElementsByClassName('content')[0];

let nameofcity = "";

permision.addEventListener('click', function() {
    if (navigator.geolocation) {
        gif.classList.add('active');
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

async function getPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    await getWeatherByLocation(lat, lon);
}

async function getWeatherByLocation(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`);
    const data = await response.json();
    console.log(data);

    for(let i=0;i<content_tab.length;i++){
        content_tab[i].classList.add('deactive');
    }
    for(let i=0;i<search_tab.length;i++){
        search_tab[i].classList.remove('active');
    }
    gif.classList.remove('active');
    await displayWeather(data);
}

// Display weather data on the page
async function displayWeather(data) {
    dataname.innerHTML = data.name;
    mode.innerHTML = data.weather[0].main;
    temperature.innerHTML = data.main.temp + " °C";
    speeddata.innerHTML = data.wind.speed + " m/s";
    humiditydata.innerHTML = data.main.humidity + " %";
    cloudsdata.innerHTML = data.clouds.all + " %";

    contentdata.classList.add('active');
    contentdata.classList.add('content_search');
}


// Store city name on Enter key press
cityname.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        nameofcity = cityname.value;
        checkfn(nameofcity);
    }
});

// Function to run validation and fetch weather on button click
function runcheckfn() {
    nameofcity = cityname.value;
    checkfn(nameofcity);
}

// Validate city name
function checkfn(nameofcity) {
    let isValid = true;

    for (let i = 0; i < nameofcity.length; i++) {
        if (/\d/.test(nameofcity[i])) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        alert('Please enter a valid city name');
    } else {
        contentdata.classList.remove('active');
        gif.classList.add('active');
        getWeather(nameofcity);
    }
}

// Fetch weather data from the API
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
    const data = await response.json();
    console.log(data);
    if (data.cod == 404) {
        alert('Please enter a valid city name');
    } else {
        await displayWeather(data);
    }
    gif.classList.remove('active');
}



// Event listeners for switching tabs
for (let i = 0; i < autoselect_tab.length; i++) {
    autoselect_tab[i].addEventListener('click', function() {
        for (let j = 0; j < autoselect_tab.length; j++) {
            autoselect_tab[j].classList.add('active_tab');
            if (select_tab[j]) {
                select_tab[j].classList.remove('active_tab');
            }
        }
        for (let j = 0; j < search_tab.length; j++) {
            search_tab[j].classList.remove('active');
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
       } else {
           alert('Geolocation is not supported by this browser.');
       }
    });
}

// your weather tab

for (let i = 0; i < select_tab.length; i++) {
    select_tab[i].addEventListener('click', function() {
        for (let j = 0; j < select_tab.length; j++) {
            select_tab[j].classList.add('active_tab');
            if (autoselect_tab[j]) {
                autoselect_tab[j].classList.remove('active_tab');
            }
        }
        // content
        contentdata.classList.remove('active');
        // permision remove
        for (let j = 0; j < content_tab.length; j++) {
            content_tab[j].classList.add('deactive');
        }
        // search add
        for (let j = 0; j < search_tab.length; j++) {
            search_tab[j].classList.add('active');
        }
        // gif remove
        gif.classList.remove('active');
    });
}
