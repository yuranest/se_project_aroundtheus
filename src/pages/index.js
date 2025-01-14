import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js"; // Import constants
import "../styles/index.css"; // Import main CSS

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

// Function to create a card
function createCard(item) {
  const card = new Card(item, ".card-template", handleImageClick);
  return card.generateCard();
}

// Initialize Section for card rendering
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
  userInfo.setUserInfo({
    name: data.name,
    job: data.description,
  });
});
profilePopup.setEventListeners();

// Initialize and handle adding new cards
const addCardPopup = new PopupWithForm(".modal_type_add-card", (data) => {
  if (!data.placeName || !data.imageLink) {
    console.error("Invalid card data:", data);
    return;
  }
  const newCard = createCard({ name: data.placeName, link: data.imageLink });
  cardSection.addItem(newCard);
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
