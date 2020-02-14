class Weather {
    constructor (tempFahrenheit, tempCelsius, weatherIcon, videoTags, backgroundVid) {
        this.getWeatherSuccess = this.getWeatherSuccess.bind(this);
        this.getWeatherError = this.getWeatherError.bind(this);
        this.currentWeather = null;
        this.tempFahrenheit = tempFahrenheit;
        this.tempCelsius = tempCelsius;
        this.weatherIcon = weatherIcon;
        this.videoTags = videoTags;
        this.backgroundVid = backgroundVid;
        this.searchQuery = null;
    };
    getWeather(userLocation) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + userLocation + ",us&appid=0b810be14937d73254c214a19e48465c",
            success: this.getWeatherSuccess,
            error: this.getWeatherError
        });
    };
    getWeatherSuccess(data) {
        this.currentWeather = data;
        var temperature = this.currentWeather.main.temp;
        var weather = (this.currentWeather.weather[0].main).toLowerCase();
        var weatherIcon = this.currentWeather.weather[0].icon;
        var videoTags = this.videoTags;
        var backgroundVid = this.backgroundVid;

        this.tempFahrenheit.textContent = ((Number(temperature) - 273.15) * 9/5 + 32).toFixed(0);
        this.tempCelsius.textContent = ((Number(temperature) - 273.15)).toFixed(0);
        while (this.weatherIcon.querySelector("img")) {
            this.weatherIcon.querySelector("img").remove();
       };
        var iconImg = document.createElement("img");
        iconImg.src = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
        this.weatherIcon.append(iconImg);

        function hideVideo () {
            for(var i = 0; i < videoTags.length; i++) {
                backgroundVid[i].className = "background hidden";
            };
       };
        switch (weather) {
            case "clear":
                hideVideo();
                backgroundVid[0].classList.remove("hidden");
                this.searchQuery = "sunny";
                break;
            case "rain":
            case "drizzle":    
                hideVideo();
                backgroundVid[1].classList.remove("hidden");
                this.searchQuery = "rain";
                break;
            case "thunderstorm":
                hideVideo();
                backgroundVid[2].classList.remove("hidden");
                this.searchQuery = "lightning";
                break;
            case "snow":
                hideVideo();
                backgroundVid[3].classList.remove("hidden");
                this.searchQuery = "snow";
                break;
            case "clouds":
                hideVideo();
                if (data.weather[0].id == 801 || data.weather[0].id == 802) {
                    backgroundVid[0].classList.remove("hidden");
                    this.searchQuery = "sunny";
                } else {
                    backgroundVid[5].classList.remove("hidden");
                    this.searchQuery = "overcast";
                }
                break;
            default:
                hideVideo();
                backgroundVid[4].classList.remove("hidden");
                this.searchQuery = "mist";
        };
    };
    getWeatherError(error) {
        console.log(error);
    };
}