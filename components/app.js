class App {
    constructor(userLocation, weather, zipCode, quotes) {
        this.userLocation = userLocation;
        this.weather = weather;
        this.zipCode = zipCode;
        this.quotes = quotes;
    };

    start() {
        this.userLocation.getLocation();
        this.quotes.getQuotes();
   };
}
