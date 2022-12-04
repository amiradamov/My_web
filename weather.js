const app = {
    init: () => {
        document.getElementById("btnGet").addEventListener('click', app.fetchWeather);
        document.getElementById("btnCurrent").addEventListener('click', app.getLocation);
        console.log()
    },
    fetchWeather: (ev) => {
        //use the values from latitude and longitude to fetch the weather
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let key = '13d3ef33c4aa86bc4dd6c32cf0bf2e14';
        let lang = 'en';
        let units = 'metric';
        let city = 'Baku'
        let limit = '1';
        // let with_city_url = `http://api.openweathermap.org/geo/1.0/reverse?q=${city}&limit=${limit}&appid=${key}`;
        
        let find_city_name_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${key}`;
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
        
        

        //fetch the weather
        fetch(url)
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            app.showWeather(data);
          })
          .catch(console.err);

          // fetch the city
          fetch(find_city_name_url)
          .then((resp1) => {
            if (!resp1.ok) throw new Error(resp1.statusText);
            return resp1.json();
          })
          .then((data) => {
            app.showWeather(data);
          })
          .catch(console.err);
    },
        
    getLocation: (ev) => {
        let opts = {
          enableHighAccuracy: true,
          timeout: 1000 * 10, //10 seconds
          maximumAge: 1000 * 60 * 5, //5 minutes
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
        //got position
        document.getElementById('latitude').value =
          position.coords.latitude.toFixed(2);
        document.getElementById('longitude').value =
          position.coords.longitude.toFixed(2);
      },
      wtf: (err) => {
        //geolocation failed
        console.error(err);
    },
    showWeather: (resp, resp1) => {
        console.log(resp);
        // console.log(resp1);
        // let row1 = document.querySelector('.weather_info');
        // const city_row1 = JSON.parse(resp);
        // document.getElementById("example1").innerHTML = city_row1.name;
        let row = document.querySelector('.weather_info');
        row.innerHTML = resp.daily.map((day, idx) => {
          if (idx <= 2){
            let dt = new Date(day.dt * 1000); //timestamp * 1000
            let sr = new Date(day.sunrise * 1000).toTimeString();
            let ss = new Date(day.sunset * 1000).toTimeString();
            return `<div class="card">
              <h5 class="card_title">${dt.toDateString()}</h5>
              <center>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                  width="140"
                />
              </center>
              <hr class = "line">
                <div class="card_container">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
          }&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
          </div>`;
          }
        }).join('');
    },
    showCity: (resp1) => {

    }
};
app.init();