import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js";
import "../styles/index.css";
import Api from "../components/Api.js";

// Initialize API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a0ce3834-8274-40bb-a117-5fa7d2b8bbe7", // token
    "Content-Type": "application/json",
  },
});

// Fetch and display user info
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
  })
  .catch((err) => console.error("Error fetching user data:", err));

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
    api
      .updateUserInfo({
        name: data.name,
        about: data.description, // ✅ Ensure consistency with API
      })
      .then(() => userInfo.setUserInfo(data))
      .catch((err) => console.error("Error updating user info:", err));
  },
  formValidators["profile-form"]
);
profilePopup.setEventListeners();

// Add card popup
const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    api
      .addCard({ name: data.placeName, link: data.imageLink })
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement); // Add the new card to the DOM
        formValidators["add-card"].disableButton(); // Disable the button after submission
      })
      .catch((err) => console.error("Error adding card:", err));
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
