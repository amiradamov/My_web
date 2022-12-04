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
        // let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
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
    showWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector('.card');
        row.innerHTML = resp.daily.map(day => {
          return '<p>Day</p>'
        }).join('');
    },
};
app.init();