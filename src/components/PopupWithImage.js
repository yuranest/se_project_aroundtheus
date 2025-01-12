import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__image");
    this._captionElement = this._popup.querySelector(".modal__caption");
  }

  open({ name, link }) {
    // Set image source, alt text, and caption, then open popup
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
