import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js";
import "../styles/index.css";

// Enable validation
const formValidators = {};
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    formValidators[formName] = validator; // Link validator to the form by its name
    validator.enableValidation();
  });
};
enableValidation(settings);

// Create a card
function createCard(item) {
  const card = new Card(item, ".card-template", handleImageClick);
  return card.generateCard();
}

// Initialize card section
const handleImageClick = (data) => imagePopup.open(data);
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// Popup for image preview
const imagePopup = new PopupWithImage(".modal_type_image");
imagePopup.setEventListeners();

// Profile popup
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profilePopup = new PopupWithForm(
  ".modal_type_edit-profile",
  (data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.description,
    });
  },
  formValidators["profile-form"]
);
profilePopup.setEventListeners();

// Add card popup
const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    const newCard = createCard({ name: data.placeName, link: data.imageLink });
    cardSection.addItem(newCard); // Add the new card to the DOM
    if (formValidators["add-card"]) {
      formValidators["add-card"].disableButton(); // Disable the button after submission
    } else {
      console.error('Validator for "add-card" is not defined');
    }
  },
  formValidators["add-card"]
);
addCardPopup.setEventListeners();

// Event listeners for popups
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    document.forms["profile-form"].name.value = userData.name;
    document.forms["profile-form"].description.value = userData.job;
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open(); // Open Add Card popup
});
