class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    openDeletePopup,
    apiInstance
  ) {
    if (!data._id) {
      console.error("❌ Error: Card ID is missing", data);
      return null; // ✅ Prevents card from being created if `_id` is missing
    }

    this._id = data._id;
    this._name = data.name || "No Title";
    this._link = data.link || "";
    this._isLiked = data.isLiked || false;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._openDeletePopup = openDeletePopup;
    this._api = apiInstance;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _updateLikeState() {
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    // Like/Unlike API call using `isLiked`
    this._likeButton.addEventListener("click", () => {
      if (!this._id) {
        console.error("Error: Cannot like/unlike a card without an ID.");
        return;
      }

      const likeAction = this._isLiked
        ? this._api.unlikeCard(this._id)
        : this._api.likeCard(this._id);

      likeAction
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked;
          this._updateLikeState();
        })
        .catch((err) => console.error("Error updating like state:", err));
    });

    // Ensure only deletable cards trigger deletion
    this._deleteButton.addEventListener("click", () => {
      if (!this._id) {
        console.error("Error: Trying to delete a card without an ID.");
        return;
      }
      this._openDeletePopup(this._id, this);
    });

    // Open Image Preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    if (!this._id) {
      console.error("❌ Skipping card generation: Missing ID", this);
      return null; // ✅ Prevents card from being rendered
    }

    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    this._updateLikeState();
    return this._element;
  }
}

export default Card;
