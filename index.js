var mat = document.querySelector("#matter");
var map = document.querySelector("#map");

async function fetchData() {
    let city = document.getElementById("city").value;
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=fa901449b25029c973b8bc6b7d33982e&units=metric`);
        let data = await res.json();
        console.log('data:', data);
        daysData(data.coord.lon, data.coord.lat);
        appendKardoBhai(data);
    }
    catch (error) {
        console.error(error);
    }
}

function appendKardoBhai(data) {
    mat.innerHTML = "";
    map.innerHTML = "";
    let name = document.createElement("h2");
    name.innerText = `Location : ${data.name}`;
    let temp = document.createElement("h2");
    temp.innerText = `Temperature : ${data.main.temp} C`;
    let min_temp = document.createElement("h2");
    min_temp.innerText = `Min Temp : ${data.main.temp_min} C`;
    let max_temp = document.createElement("h2");
    max_temp.innerText = `Max Temp : ${data.main.temp_max} C`;
    let wind = document.createElement("h2");
    wind.innerText = `Wind : Degree - ${data.wind.deg}, Speed - ${data.wind.speed}`;
    let clouds = document.createElement("h2");
    clouds.innerText = `Clouds : ${data.clouds.all}`;
    let sunrise = document.createElement("h2");
    sunrise.innerText = `Sunrise Time : ${window.moment(data.sys.sunrise * 1000).format("hh:mm A")}`;
    let sunset = document.createElement("h2");
    sunset.innerText = `Sunset Time : ${window.moment(data.sys.sunset * 1000).format("hh:mm A")}`;
    let iframe = document.createElement("iframe");
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&.ie=UTF8&iwloc=&output=embed`;

    map.append(iframe);
    mat.append(name, temp, min_temp, max_temp, wind, clouds, sunrise, sunset);
}

async function daysData(lon, lat) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=fa901449b25029c973b8bc6b7d33982e`);
        let data = await res.json();
        let ddata = data.daily;
        console.log('data:', data.daily);
        each(ddata);
    }
    catch (error) {
        console.error(error);
    }
}

function each(ddata) {
    document.getElementById("days").innerHTML = "";
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
        let el = ddata[i];
        var meradiv = document.getElementById("days");
        let chota = document.createElement("div");
        let p = document.createElement("p");
        p.innerText = day[i];
        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
        let h1 = document.createElement("h2");
        h1.innerText = `${el.temp.max} C`;
        h1.setAttribute("class", "mm");
        let h12 = document.createElement("h2");
        h12.setAttribute("class", "mm1");
        h12.innerText = `${el.temp.min} C`;
        chota.append(p, img, h1, h12);
        meradiv.append(chota);
    }
}
