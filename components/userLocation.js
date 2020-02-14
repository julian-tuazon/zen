class UserLocation {
    constructor (weather, locationDisplay, locationInput) {
        this.getLocationSuccess = this.getLocationSuccess.bind(this);
        this.getLocationError = this.getLocationError.bind(this);
        this.userLocation = null;
        this.weather = weather;
        this.locationDisplay = locationDisplay;
        this.locationInput = locationInput;
    };
    getLocation() {
        $.ajax({
            url: "http://ip-api.com/json/",
            success: this.getLocationSuccess,
            error: this.getLocationError
        });
    };
    getLocationSuccess(data) {
        this.userLocation = data;
        var city = this.userLocation.city;
        var state = this.userLocation.region;
        this.locationDisplay.textContent = city + ", " + state;
        this.getWeatherCallback(this.userLocation.zip);
        this.locationInput.value = "";
    };
    getLocationError(error) {
        console.log(error);
        this.locationInput.value = "";
    };
    getWeatherCallback (zipCode) {
        this.weather.getWeather(zipCode);
    };
}