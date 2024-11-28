//==========================================================================//
//                          Cards Template                                  //
//=========================================================================//

const cardTemplate = document.querySelector(".card-template");
const cardsContainer = document.querySelector(".cards__list");

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

  // Add Like Button Functionality
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Add Delete Functionality
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Add Click Event for Image Modal
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
//                          Profil Edit Button / Open / Close               //
//=========================================================================//

const editProfileModal = document.querySelector(".modal_type_edit-profile");
const editProfileModalCloseButton =
  editProfileModal.querySelector(".modal__close-btn");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileForm = editProfileModal.querySelector(".modal__form");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Load profile data into inputs when opening the modal
editProfileButton.addEventListener("click", () => {
  const nameInput = editProfileForm.querySelector("[name='name']");
  const descriptionInput = editProfileForm.querySelector(
    "[name='description']"
  );
  nameInput.value = document.querySelector(".profile__title").textContent;
  descriptionInput.value = document.querySelector(
    ".profile__description"
  ).textContent;

  openModal(editProfileModal);
});

editProfileModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileModal.addEventListener("click", (event) => {
  if (event.target === editProfileModal) {
    closeModal(editProfileModal);
  }
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = editProfileForm.querySelector("[name='name']");
  const descriptionInput = editProfileForm.querySelector(
    "[name='description']"
  );
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent =
    descriptionInput.value;

  closeModal(editProfileModal);
});

//==========================================================================//
//                          Add Card Button / Open / Close                  //
//=========================================================================//
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector(".modal_type_add-card");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close-btn");

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardModal.addEventListener("click", (event) => {
  if (event.target === addCardModal) {
    closeModal(addCardModal);
  }
});

const addCardForm = addCardModal.querySelector(".modal__form");

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const placeName = addCardForm.placeName.value;
  const imageLink = addCardForm.imageLink.value;

  const newCard = getCardElement({ name: placeName, link: imageLink });
  cardsContainer.prepend(newCard);

  addCardForm.reset();
  closeModal(addCardModal);
});

//==========================================================================//
//                          Card Image Modal                              //
//=========================================================================//

const imageModal = document.querySelector(".modal_type_image");
const imageElement = imageModal.querySelector(".modal__image");
const captionElement = imageModal.querySelector(".modal__caption");
const imageModalCloseButton = imageModal.querySelector(
  ".modal__close-btn_image"
);

function openImageModal(imageSrc, caption) {
  imageElement.src = imageSrc;
  imageElement.alt = caption;
  captionElement.textContent = caption;
  openModal(imageModal);
}

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});
