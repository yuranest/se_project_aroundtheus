import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { settings } from "../utils/constants.js";
import "../styles/index.css";
import Api from "../components/Api.js";

// ✅ Initialize API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a0ce3834-8274-40bb-a117-5fa7d2b8bbe7", // Token
    "Content-Type": "application/json",
  },
});

// ✅ Initialize UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// ✅ Fetch and display user profile
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name || "Unknown Name",
      job: userData.about || "No job specified",
      avatar: userData.avatar || "default-avatar.jpg",
    });
  })
  .catch((err) => console.error("Error fetching user data:", err));

// ✅ Enable form validation
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

// ✅ Function to create a card
function createCard(item) {
  if (!item._id) {
    console.error("Skipping card without ID:", item);
    return null;
  }
  return new Card(
    item,
    ".card-template",
    handleImageClick,
    openDeletePopup,
    api
  ).generateCard();
}

// ✅ Initialize card section (Only API Cards)
const handleImageClick = (data) => imagePopup.open(data);
const cardSection = new Section(
  {
    renderer: (data) => {
      const cardElement = createCard(data);
      if (cardElement) cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// ✅ Fetch and display only API cards
api
  .getInitialCards()
  .then((cards) => {
    if (!Array.isArray(cards)) {
      throw new Error("Invalid API response: Expected an array of cards");
    }
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("Error loading initial cards:", err));

// ✅ Popup for image preview
const imagePopup = new PopupWithImage(".modal_type_image");
imagePopup.setEventListeners();

// ✅ Profile popup
const profilePopup = new PopupWithForm(
  ".modal_type_edit-profile",
  (data) => {
    return api
      .updateUserInfo({
        name: data.name,
        about: data.description,
      })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          job: updatedUser.about,
        });
      });
  },
  formValidators["profile-form"]
);
profilePopup.setEventListeners();

// ✅ Add card popup (Fix: Only adds new card)
const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    return api
      .addCard({ name: data.placeName, link: data.imageLink })
      .then((newCard) => {
        if (!newCard || !newCard._id) {
          throw new Error("Error: New card does not have a valid ID.");
        }
        const cardElement = createCard(newCard);
        if (cardElement) cardSection.addItem(cardElement);
      });
  },
  formValidators["add-card"]
);
addCardPopup.setEventListeners();

// ✅ Avatar update popup (Fix: Use userInfo for setting)
const avatarPopup = new PopupWithForm(
  ".modal_type_avatar",
  (data) => {
    return api.updateUserAvatar({ avatar: data.avatar }).then((res) => {
      userInfo.setUserInfo({ avatar: res.avatar });
    });
  },
  formValidators["avatar-form"]
);
avatarPopup.setEventListeners();

// ✅ Open avatar popup on button click
document.querySelector(".avatar__edit-button").addEventListener("click", () => {
  avatarPopup.open();
});

// ✅ Delete confirmation popup
let cardToDelete = null;
let cardIdToDelete = null;

const deletePopup = new PopupWithForm(".modal_type_delete", () => {
  if (cardToDelete && cardIdToDelete) {
    return api.deleteCard(cardIdToDelete).then(() => {
      cardToDelete.deleteCard();
      cardToDelete = null;
      cardIdToDelete = null;
      deletePopup.close();
    });
  }
  return Promise.reject("No card selected for deletion");
});
deletePopup.setEventListeners();

// ✅ Function to open delete popup
function openDeletePopup(cardId, cardInstance) {
  if (!cardId) {
    console.error("Error: Trying to delete a card without an ID");
    return;
  }
  cardIdToDelete = cardId;
  cardToDelete = cardInstance;
  deletePopup.open();
}

// ✅ Event listeners for profile popups
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    userData.description = userData.job;
    profilePopup.setInputValues(userData);
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
