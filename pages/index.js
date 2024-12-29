import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

function handleImageClick(name, link) {
  const imageModal = document.querySelector(".modal_type_image");
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;

  openModal(imageModal);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

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

const cardTemplateSelector = ".card-template";
const cardsContainer = document.querySelector(".cards__list");

function renderCards(cardsArray) {
  cardsArray.forEach((cardData) => {
    const card = new Card(cardData, cardTemplateSelector, handleImageClick);
    const cardElement = card.generateCard();
    cardsContainer.appendChild(cardElement);
  });
}

renderCards(initialCards);

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const profileFormValidator = new FormValidator(settings, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, cardForm);
cardFormValidator.enableValidation();

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
  profileForm.name.value = profileTitleElement.textContent;
  profileForm.description.value = profileDescriptionElement.textContent;

  profileFormValidator.resetValidation();
  openModal(document.querySelector(".modal_type_edit-profile"));
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitleElement.textContent = profileForm.name.value;
  profileDescriptionElement.textContent = profileForm.description.value;

  closeModal(document.querySelector(".modal_type_edit-profile"));
});

const addCardButton = document.querySelector(".profile__add-button");

addCardButton.addEventListener("click", () => {
  cardForm.reset();
  cardFormValidator.resetValidation();
  openModal(document.querySelector(".modal_type_add-card"));
});

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = new Card(
    {
      name: cardForm.placeName.value,
      link: cardForm.imageLink.value,
    },
    cardTemplateSelector,
    handleImageClick
  );
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);

  cardForm.reset();
  closeModal(document.querySelector(".modal_type_add-card"));
});
