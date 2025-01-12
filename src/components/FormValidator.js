class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings; // Validation configuration
    this._formElement = formElement; // Form element to validate
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    // Display error message for invalid input
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    // Remove error message and styling
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _isValid(inputElement) {
    // Check if the input is valid and display/hide error
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    // Enable/disable submit button based on form validity
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );

    if (hasInvalidInput) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    // Attach input event listeners to validate on the fly
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    // Prevent default form submission and enable validation
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    // Reset all validation messages and button state
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}

export default FormValidator;
