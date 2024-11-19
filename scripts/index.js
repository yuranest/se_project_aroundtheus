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
