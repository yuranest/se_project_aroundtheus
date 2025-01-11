import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../styles/index.css"; // Updated path

// Cache constant DOM elements at the top
const imageModal = document.querySelector(".modal_type_image");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const addCardModal = document.querySelector(".modal_type_add-card");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const cardsContainer = document.querySelector(".cards__list");

// Forms
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

// Universal form validators object
const formValidators = {};

// Enable validation for all forms dynamically
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(settings);

// Handle image click for modal opening
function handleImageClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openModal(imageModal);
}

// Open modal
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

// Close modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

// Handle Escape key to close modals
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Add close functionality for all popups
const popups = document.querySelectorAll(".modal");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close-btn")
    ) {
      closeModal(popup);
    }
  });
});

// Reusable function to create a card
function createCard(cardData) {
  const card = new Card(cardData, ".card-template", handleImageClick);
  return card.generateCard();
}

// Universal function to render a card
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item);
  cardsContainer[method](cardElement);
}

// Render initial cards using append
function renderCards(cardsArray) {
  cardsArray.forEach((cardData) => {
    renderCard(cardData, "append");
  });
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

renderCards(initialCards); // Render initial cards

// Profile form submission
editProfileButton.addEventListener("click", () => {
  profileForm.name.value = profileTitleElement.textContent;
  profileForm.description.value = profileDescriptionElement.textContent;
  formValidators[profileForm.getAttribute("name")].resetValidation();
  openModal(editProfileModal);
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitleElement.textContent = profileForm.name.value;
  profileDescriptionElement.textContent = profileForm.description.value;
  closeModal(editProfileModal);
});

// Add Card Modal
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardData = {
    name: cardForm.placeName.value,
    link: cardForm.imageLink.value,
  };
  renderCard(cardData, "prepend");
  cardForm.reset();
  closeModal(addCardModal);
});
