class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Popup element
    this._handleEscClose = this._handleEscClose.bind(this); // Bind to preserve context
  }

  open() {
    // Open the popup
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // Close the popup
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    // Close the popup on pressing Escape
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Add event listeners for close actions
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close-btn")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
