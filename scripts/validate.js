// Shows the input error message
function showInputError(formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
  errorElement.style.visibility = "visible"; // Ensure error message is displayed
}

// Hides the input error message
function hideInputError(formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorClass);
  errorElement.style.visibility = "hidden"; // Hide error message
}

// Checks if the input is valid
function isValid(formElement, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectors
    );
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

// Toggles the state of the submit button
function toggleButtonState(inputList, buttonElement, selectors) {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasInvalidInput) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Sets event listeners for form inputs
function setEventListeners(formElement, selectors) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

// Enables form validation
function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission
    });

    setEventListeners(formElement, selectors);
  });
}

// Export the enableValidation function for use in index.js
export { enableValidation };
