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
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

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

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close-btn");

function closeModal() {
  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

//==========================================================================//
//                          Enter and Save Modal                            //
//=========================================================================//
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".modal__input[name='name']");
const descriptionInput = document.querySelector(
  ".modal__input[name='description']"
);

const profileForm = document.querySelector(".modal__form");

function openModal() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  modal.classList.add("modal_opened");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
