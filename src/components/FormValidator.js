class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; // Validation configuration settings
    this._formElement = formElement; // Form element to validate
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    ); // Array of all input fields in the form
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    ); // Submit button for the form
  }

  // Show error for a specific input field
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ); // Find the error element associated with the input
    inputElement.classList.add(this._settings.inputErrorClass); // Highlight the input with an error class
    errorElement.textContent = errorMessage; // Display the error message
    errorElement.classList.add(this._settings.errorClass); // Show the error element
  }

  // Hide error for a specific input field
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ); // Find the error element associated with the input
    inputElement.classList.remove(this._settings.inputErrorClass); // Remove error highlight
    errorElement.textContent = ""; // Clear the error message
    errorElement.classList.remove(this._settings.errorClass); // Hide the error element
  }

  // Validate the specific input field
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // If the input is invalid, show the error
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // If the input is valid, hide any existing errors
      this._hideInputError(inputElement);
    }
  }

  // Update the state of the submit button
  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    ); // Check if any input field is invalid

    if (hasInvalidInput) {
      this.disableButton(); // Disable the button if there are invalid inputs
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass); // Enable the button
      this._submitButton.disabled = false;
    }
  }

  // Disable the submit button
  disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass); // Add inactive class to the button
    this._submitButton.disabled = true; // Disable the button
  }

  // Add event listeners to input fields
  _setEventListeners() {
    this._toggleButtonState(); // Set the initial state of the button

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement); // Validate the input on each change
        this._toggleButtonState(); // Update the button state
      });
    });
  }

  // Enable validation for the form
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission
    });
    this._setEventListeners();
  }

  // Reset validation state for the form
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); // Clear all input errors
    });
    this.disableButton(); // Disable the submit button
  }
}

export default FormValidator;
