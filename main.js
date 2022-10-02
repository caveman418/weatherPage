let tempInKelvin;

const searchBar = document.querySelector('#queryCity');
const searchButton = document.querySelector('#search');
const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const wind = document.querySelector('.wind');
const cButton = document.querySelector('#celsius');
const fButton = document.querySelector('#fah');
const description = document.querySelector('.description');
const unit = document.querySelector('#unit');

(async function () { //automatically load Chicago's weather when the page is loaded
    const query = searchBar.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=489b4b68f1b5193a8aff400d9569466f`)
    const data = await response.json();
    searchBar.setCustomValidity('');
    updateWeather(data);
})();

searchButton.addEventListener('mousedown', async () => {
    try {
        const query = searchBar.value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=489b4b68f1b5193a8aff400d9569466f`)
        const data = await response.json();
        searchBar.setCustomValidity('');
        updateWeather(data);
    } catch (err) {
        console.log(err);
        searchBar.setCustomValidity('Invalid field.');
    }
});

cButton.addEventListener('mousedown', () => {
    temp.textContent = KelvinToCelsius(tempInKelvin);
});

fButton.addEventListener('mousedown', () => {
    temp.textContent = KelvinToFahrenheit(tempInKelvin);
});

const updateWeather = (data) => {
    tempInKelvin = data.main.temp;
    temp.textContent = `${KelvinToFahrenheit(tempInKelvin)}`;

    condition.textContent = punctuateString(data.weather[0].description);

    wind.textContent = `${Math.round(data.wind.speed*2.237)}mph ${windDir(data.wind.deg)}`;

    description.textContent = `${data.name}, ${data.sys.country}`;
}

const punctuateString = (str) => {
    const lowerCase = str.toLowerCase();
    const lowerCaseArr = lowerCase.split(' ');
    const upperCaseArr = lowerCaseArr.map(word => word[0].toUpperCase() + word.slice(1));
    return upperCaseArr.join(' ');
}

const KelvinToFahrenheit = (temp) => {
    unit.textContent = 'F';
    return Math.round(1.8*(temp - 273.15) + 32);
}

const KelvinToCelsius = (temp) => {
    unit.textContent = 'C';
    return Math.round(temp - 273);
}

const windDir = (deg) => {
    if (deg >= 337.5 || deg <= 22.5) return 'N'
    else if (deg > 22.5 && deg < 67.5) return 'NE'
    else if (deg >= 67.5 && deg < 112.5) return 'E'
    else if (deg >= 112.5 && deg < 157.5) return 'SE'
    else if (deg >= 157.5 && deg < 202.5) return 'S'
    else if (deg >= 202.5 && deg < 247.5) return 'SW'
    else if (deg >= 247.5 && deg < 292.5) return 'W'
    else if (deg >= 292.5 && deg < 337.5) return 'NW'
}