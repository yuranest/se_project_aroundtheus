class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name || "No Title"; // Fallback for missing title
    this._link = data.link || ""; // Fallback for missing link
    this._cardSelector = cardSelector; // Card template selector
    this._handleImageClick = handleImageClick; // Click handler for the card image
  }

  _getTemplate() {
    // Fetch and clone the card template
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Set up event listeners for card interactions
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    // Create the card and set its content
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
