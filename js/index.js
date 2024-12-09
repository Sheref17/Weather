document.getElementById("city").addEventListener("input", function() {
    let search = document.getElementById("city").value;
    getcity(search);
});

let city = {};
let current = {};
let forecastday = {};

function getcity(cityName) {
    let myhttp = new XMLHttpRequest();
    myhttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=2715a5f8998f4a4bb37131747240912&q=${cityName}&days=3`);
    myhttp.responseType = "json";
    myhttp.send();

    myhttp.addEventListener("load", function() {
        if (myhttp.status === 200) {
            console.log(myhttp.response);
            city = myhttp.response.location;
            current = myhttp.response.current;
            forecastday = myhttp.response.forecast.forecastday;
            display();
        } else {
            console.error("Error fetching data");
        }
    });
}

function getDayOfWeek(dateStr) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateStr);  
    return days[date.getDay()];  
}

function display() {
    let cartona = `
        <div class="Weather col p-0">
            <div class="Head d-flex justify-content-between align-items-center">
                <div class="day">${getDayOfWeek(forecastday[0].date)}</div> 
                <div class="date">${forecastday[0].date}</div>
            </div>
            <div class="temp text-center">
                <p>${city.name}</p>
            </div>
            <div class="deg"> 
                ${current.temp_c} <sup>o</sup> C
                <div class="temp-icon">
                    <img src="${current.condition.icon}" alt="">
                </div>
            </div>
            <div class="Weather-Status">
                <span>${current.condition.text}</span>
            </div>
            <div class="spans d-flex justify-content-around">
                <span><img src="./image/icon-umberella.png" alt="">20%</span>
                <span><img src="./image/icon-wind.png" alt="">18Km/h</span>
                <span><img src="./image/icon-compass.png" alt="">East</span>
            </div>
        </div>

        <div class="Weather col p-0 text-center">
            <div class="Head d-flex justify-content-center align-items-center">
                <p>${getDayOfWeek(forecastday[1].date)}</p>  
            </div>
            <div class="temp-icon">
                <img src="${forecastday[1].day.condition.icon}" alt="">
            </div>
            <div class="deg">
                ${forecastday[1].day.maxtemp_c} <sup>o</sup> C
            </div>
            <div class="Weather-Status">
                <span>${forecastday[1].day.condition.text}</span>
            </div>
        </div>

        <div class="Weather col p-0 text-center">
            <div class="Head d-flex justify-content-center align-items-center">
                <p>${getDayOfWeek(forecastday[2].date)}</p> 
            </div>
            <div class="temp-icon">
                <img src="${forecastday[2].day.condition.icon}" alt="">
            </div>
            <div class="deg">
                ${forecastday[2].day.maxtemp_c} <sup>o</sup> C
            </div>
            <div class="Weather-Status">
                <span>${forecastday[2].day.condition.text}</span>
            </div>
        </div>
    `;
    
    document.getElementById("rowdata").innerHTML = cartona;
}
