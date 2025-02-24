import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, formValidator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
    this._submitButton = this._form.querySelector(".modal__save-btn");
    this._defaultButtonText = this._submitButton.textContent;
    this._formValidator = formValidator;
  }

  _showLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._defaultButtonText;
    this._submitButton.disabled = isLoading;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value.trim();
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    });
  }

  getForm() {
    return this._form;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._showLoading(true);

      try {
        const result = this._handleFormSubmit(this._getInputValues());

        if (result instanceof Promise) {
          result
            .then(() => {
              this.close();
              this._form.reset();
              if (this._formValidator) this._formValidator.resetValidation();
            })
            .finally(() => this._showLoading(false));
        } else {
          throw new Error("_handleFormSubmit did not return a Promise");
        }
      } catch (err) {
        console.error("Form submission error:", err);
        this._showLoading(false);
      }
    });
  }

  open() {
    if (this._formValidator) {
      this._formValidator.resetValidation();
    }
    super.open();
  }
}

export default PopupWithForm;
