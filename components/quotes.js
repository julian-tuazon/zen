class Quotes {
  constructor(quoteContent1, quoteContent2, qButton) {
    this.quoteContent1 = quoteContent1;
    this.quoteContent2 = quoteContent2;
    this.qButton = qButton;

    this.setIntervalID = null;
    this.handleGetQuoteSuccess = this.handleGetQuoteSuccess.bind(this);
    this.handleGetQuoteError = this.handleGetQuoteError.bind(this);
    this.initializeModal = this.initializeModal.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
  }

  handleGetQuoteSuccess(data) {
    this.quoteContent1.textContent = `"${data.quoteText}"`;

    if (data.quoteAuthor.length === 0) {
      this.quoteContent2.textContent = "Unknown"
    }
    else {
      this.quoteContent2.textContent = `${data.quoteAuthor}`;
    }

    this.qButton.addEventListener("click", this.initializeModal)
  }

  initializeModal() {
    document.querySelector('#quote-modal').classList.remove('hidden');
    document.querySelector('#home-page').classList.add('hidden');
    this.setIntervalID = setInterval(this.getQuotes, 6000);

  }

  handleGetQuoteError(error) {
    console.log(error);
  }

  getQuotes() {
    $.ajax({
      url: "https://quote-garden.herokuapp.com/quotes/random",
      success: this.handleGetQuoteSuccess,
      error: this.handleGetQuoteError
    })
  }

}
