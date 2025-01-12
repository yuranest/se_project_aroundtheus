import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../styles/index.css"; // Import main CSS

// Array of initial cards to render on page load
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

// Form validation settings
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Enable form validation
const formValidators = {};
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settings);

// Initialize Section for card rendering
const handleImageClick = (data) => imagePopup.open(data);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, ".card-template", handleImageClick);
      cardSection.addItem(card.generateCard());
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// Initialize PopupWithImage
const imagePopup = new PopupWithImage(".modal_type_image");
imagePopup.setEventListeners();

// Initialize UserInfo for profile data handling
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Initialize and handle profile editing popup
const profilePopup = new PopupWithForm(".modal_type_edit-profile", (data) => {
  console.log("Profile Form Submission Data:", data); // Debugging
  userInfo.setUserInfo({
    name: data.name,
    job: data.description, // Map 'description' to 'job'
  });
});
profilePopup.setEventListeners();

// Initialize and handle adding new cards
const addCardPopup = new PopupWithForm(".modal_type_add-card", (data) => {
  if (!data.placeName || !data.imageLink) {
    console.error("Invalid card data:", data); // Log invalid data
    return;
  }
  const newCard = new Card(
    { name: data.placeName, link: data.imageLink },
    ".card-template",
    handleImageClick
  );
  cardSection.addItem(newCard.generateCard());
});
addCardPopup.setEventListeners();

// Event listeners for opening modals
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    document.forms["profile-form"].name.value = userData.name;
    document.forms["profile-form"].description.value = userData.job;
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
