class ZipCode {
    constructor (weather, locationInput, locationDisplay) {
        this.getZipSuccess = this.getZipSuccess.bind(this);
        this.getZipError = this.getZipError.bind(this);
        this.inputZip = null;
        this.userLocation = null;
        this.weather = weather;
        this.locationInput = locationInput;
        this.locationDisplay = locationDisplay;
    };
    getZip (inputZip) {
        if (!/[\d]{5}/.test(inputZip)) {
            return alert("Please enter a valid 5 digit ZIP code.");
        } else {
            $.ajax ({
                url: "http://api.zippopotam.us/us/" + inputZip,
                success: this.getZipSuccess,
                error: this.getZipError
            });
        }
    };
    getZipSuccess (data) {
        this.userLocation = this.locationInput.value;
        this.inputZip = data.places[0];
        this.locationDisplay.textContent = this.inputZip["place name"] + ", " + this.inputZip["state abbreviation"];
        this.getWeatherCallback(this.userLocation);
        this.locationInput.value = "";
    };
    getZipError (error) {
        console.log(error);
        alert("Invalid ZIP code. Please try again.");
        this.locationInput.value = "";
    };
    getWeatherCallback (userLocation) {
        this.weather.getWeather(userLocation);
    };
}