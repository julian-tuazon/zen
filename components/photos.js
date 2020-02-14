class Photos {
  constructor(weather) {
    this.handleGetPhotoSuccess = this.handleGetPhotoSuccess.bind(this);
    this.handleGetPhotoError = this.handleGetPhotoError.bind(this);
    this.initializeModal = this.initializeModal.bind(this);
    this.weather = weather;
  }

  getPhotos() {
    $.ajax({
      method: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "563492ad6f91700001000001181a6d6be1a748cbba8b2a899f7be7b1");
      },
      url: "https://api.pexels.com/v1/search?query=" + this.weather.searchQuery + "&per_page=80&page=1",
      success: this.handleGetPhotoSuccess,
      error: this.handleGetPhotoError,
    });
  }

  handleGetPhotoSuccess(data) {
    var selectedPhotos = [];
    var counter = 0;
    if (data.photos.length > 3) {
      while (counter < 4) {
        var randomIndex = Math.floor(Math.random() * (data.photos.length));
        if (!selectedPhotos.includes(data.photos[randomIndex])) {
          selectedPhotos.push(data.photos[randomIndex]);
          counter++;
        }
      }
      $(".d-block").each(function (i) {
        this.src = selectedPhotos[i].src.large;
      })
    }
  }

  handleGetPhotoError(error) {
    console.log(error);
  }

  initializeModal() {
    this.getPhotos();
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('photo-modal').classList.remove('hidden');
  }
}
