import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Callback for form submission
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  _getInputValues() {
    // Collect and return all input values as an object
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value.trim(); // Trim spaces
    });
    return inputValues;
  }

  setEventListeners() {
    // Add event listeners for the form and close actions
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    // Reset the form and close the popup
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
