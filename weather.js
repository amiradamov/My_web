$.getJSON(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`, function(data) {var text = `City: ${data.city.name}<br>`;$(".mypanel").html(text);});