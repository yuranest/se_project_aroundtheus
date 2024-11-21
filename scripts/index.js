//==========================================================================//
//                          Cards Template                                  //
//=========================================================================//

const cardTemplate = document.querySelector(".card-template"); // Template//
const cardsContainer = document.querySelector(".cards__list"); // Cards Container//

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
  const cardElement = cardTemplate.content.cloneNode(true); // Clone Template //
  const cardImage = cardElement.querySelector(".card__image"); // Select Image //
  const cardTitle = cardElement.querySelector(".card__title"); // Select Title //

  cardImage.src = data.link; // Set link to Image //
  cardImage.alt = data.name; // Set alt for Image //
  cardTitle.textContent = data.name; // Set Title text //

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

// Select elements
const editButton = document.querySelector(".profile__edit-button"); // "Edit" button
const modal = document.querySelector(".modal"); // The modal element
const closeButton = document.querySelector(".modal__close-btn"); // Close button

// Function to open the modal
function openModal() {
  modal.classList.add("modal_opened"); // Adds the class to show the modal
}

// Function to close the modal
function closeModal() {
  modal.classList.remove("modal_opened"); // Removes the class to hide the modal
}

// Event listeners
editButton.addEventListener("click", openModal); // Opens modal on "Edit" button click
closeButton.addEventListener("click", closeModal); // Closes modal on close button click

// Close modal when clicking on the overlay (background outside modal content)
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

//==========================================================================//
//                          Enter and Save Modal                            //
//=========================================================================//
// Select profile elements
const profileName = document.querySelector(".profile__title"); // Name on the profile
const profileDescription = document.querySelector(".profile__description"); // Description on the profile

// Select modal input fields
const nameInput = document.querySelector(".modal__input[name='name']"); // "Name" input field
const descriptionInput = document.querySelector(
  ".modal__input[name='description']"
); // "About me" input field

// Select form element
const profileForm = document.querySelector(".modal__form"); // The form inside the modal

// Function to open the modal and populate fields
function openModal() {
  // Populate the modal input fields with current profile data
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  // Show the modal
  modal.classList.add("modal_opened");
}

// Function to handle form submission
function handleProfileFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Update profile with new data from the modal inputs
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // Close the modal
  closeModal();
}

// Add event listener for form submission
profileForm.addEventListener("submit", handleProfileFormSubmit);
