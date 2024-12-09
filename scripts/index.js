import { enableValidation } from "./validate.js";

// Initialize form validation
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});

//==========================================================================//
//                          DOM Element Constants                           //
//=========================================================================//

const cardTemplate = document.querySelector(".card-template");
const cardsContainer = document.querySelector(".cards__list");

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const imageElement = document.querySelector(".modal__image");
const captionElement = document.querySelector(".modal__caption");

//==========================================================================//
//                          Utility Functions                               //
//=========================================================================//

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

// Combine overlay and close button listeners
const popups = document.querySelectorAll(".modal");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal_opened") || // Click on overlay
      evt.target.classList.contains("modal__close-btn") // Click on close button
    ) {
      closeModal(popup);
    }
  });
});

//==========================================================================//
//                          Cards Template                                  //
//=========================================================================//

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

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openImageModal(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

function renderCards(cardsArray) {
  cardsArray.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.appendChild(cardElement);
  });
}

renderCards(initialCards);

//==========================================================================//
//                          Profile Edit Button                             //
//=========================================================================//

editProfileButton.addEventListener("click", () => {
  profileForm.name.value = profileTitleElement.textContent;
  profileForm.description.value = profileDescriptionElement.textContent;

  openModal(document.querySelector(".modal_type_edit-profile"));
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitleElement.textContent = profileForm.name.value;
  profileDescriptionElement.textContent = profileForm.description.value;

  closeModal(document.querySelector(".modal_type_edit-profile"));
});

//==========================================================================//
//                          Add Card Button                                 //
//=========================================================================//

addCardButton.addEventListener("click", () => {
  openModal(document.querySelector(".modal_type_add-card"));
});

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = getCardElement({
    name: cardForm.placeName.value,
    link: cardForm.imageLink.value,
  });
  cardsContainer.prepend(newCard);

  cardForm.reset();
  closeModal(document.querySelector(".modal_type_add-card"));
});

//==========================================================================//
//                          Card Image Modal                                //
//=========================================================================//

function openImageModal(imageSrc, caption) {
  const validSrc = imageSrc || "./images/NoImage.jpg";
  imageElement.src = validSrc;
  imageElement.alt = caption;
  captionElement.textContent = caption;
  openModal(document.querySelector(".modal_type_image"));
}
