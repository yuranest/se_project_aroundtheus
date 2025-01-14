import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Callback for form submission
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input")); // Collect input fields only once
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
      this._handleFormSubmit(this._getInputValues()); // Pass collected input values to the callback
      this._form.reset(); // Clear inputs only after successful submission
      this.close(); // Close the popup after submission
    });
  }

  close() {
    // Close the popup without clearing inputs
    super.close();
  }
}

export default PopupWithForm;
