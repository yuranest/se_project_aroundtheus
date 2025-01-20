import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator) {
    super(popupSelector); // Initialize the base Popup class
    this._handleFormSubmit = handleFormSubmit; // Callback function for form submission
    this._form = this._popup.querySelector(".modal__form"); // The form element inside the popup
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input")); // List of input fields in the form
    this._formValidator = formValidator; // FormValidator instance
  }

  // Collect all input values from the form
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value.trim(); // Save each input's value by its name
    });
    return inputValues;
  }

  // Add event listeners for the popup
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission
      this._handleFormSubmit(this._getInputValues()); // Call the submit callback with form values
      this._form.reset(); // Clear the form inputs after submission
      if (this._formValidator) {
        this._formValidator.resetValidation(); // Reset validation state
      }
      this.close(); // Close the popup
    });
  }

  // Open the popup and reset its state
  open() {
    if (this._formValidator) {
      this._formValidator.resetValidation(); // Reset validation and disable the submit button
    }
    super.open();
  }

  // Close the popup
  close() {
    super.close();
  }
}

export default PopupWithForm;
