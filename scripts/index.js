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
const editProfileModal = document.querySelector(".modal_type_edit-profile");
const editProfileModalCloseButton = editProfileModal.querySelector(
  ".modal__close-btn_type_edit-profile"
);
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const editProfileNameInput = editProfileForm.querySelector("[name='name']");
const editProfileDescriptionInput = editProfileForm.querySelector(
  "[name='description']"
);

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".modal_type_add-card");
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-btn_type_add-card"
);
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardForm.querySelector("[name='placeName']");
const addCardUrlInput = addCardForm.querySelector("[name='imageLink']");

const imageModal = document.querySelector(".modal_type_image");
const imageElement = imageModal.querySelector(".modal__image");
const captionElement = imageModal.querySelector(".modal__caption");
const imageModalCloseButton = imageModal.querySelector(
  ".modal__close-btn_type_image"
);

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

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

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
//                          Profile Edit Button / Open / Close              //
//=========================================================================//

editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileTitleElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;

  openModal(editProfileModal);
});

editProfileModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileModal.addEventListener("mousedown", handleOverlayClick);

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileTitleElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;

  closeModal(editProfileModal);
});

//==========================================================================//
//                          Add Card Button / Open / Close                  //
//=========================================================================//

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardModal.addEventListener("mousedown", handleOverlayClick);

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCard = getCardElement({
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  });
  cardsContainer.prepend(newCard);

  addCardForm.reset();
  closeModal(addCardModal);
});

//==========================================================================//
//                          Card Image Modal                                //
//=========================================================================//

function openImageModal(imageSrc, caption) {
  const validSrc = imageSrc || "./images/NoImage.jpg";
  imageElement.src = validSrc;
  imageElement.alt = caption;
  captionElement.textContent = caption;
  openModal(imageModal);
}

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

imageModal.addEventListener("mousedown", handleOverlayClick);
