import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, settings } from "../utils/constants.js";
import "../styles/index.css";
import Api from "../components/Api.js";

// ✅ Initialize API instance
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a0ce3834-8274-40bb-a117-5fa7d2b8bbe7", // token
    "Content-Type": "application/json",
  },
});

// ✅ Initialize UserInfo with avatar support
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// ✅ Fetch user profile data and set it in the UI
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

// ✅ Create a card
function createCard(item) {
  const card = new Card(
    item,
    ".card-template",
    handleImageClick,
    openDeletePopup,
    api
  );
  return card.generateCard();
}

// ✅ Initialize card section
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
      .then(() => {
        userInfo.setUserInfo(data);
        document.forms["profile-form"].reset();
      })
      .catch((err) => console.error("Error updating user info:", err));
  },
  formValidators["profile-form"]
);
profilePopup.setEventListeners();

// ✅ Add card popup
const addCardPopup = new PopupWithForm(
  ".modal_type_add-card",
  (data) => {
    return api
      .addCard({ name: data.placeName, link: data.imageLink })
      .then((newCard) => {
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement);
        document.forms["add-card"].reset();
        formValidators["add-card"].disableButton();
      })
      .catch((err) => console.error("Error adding card:", err));
  },
  formValidators["add-card"]
);
addCardPopup.setEventListeners();

// ✅ Avatar update popup
const avatarPopup = new PopupWithForm(
  ".modal_type_avatar",
  (data) => {
    return api
      .updateUserAvatar({ avatar: data.avatar })
      .then((res) => {
        document.querySelector(".profile__avatar").src = res.avatar;
        document.forms["avatar-form"].reset();
      })
      .catch((err) => console.error("Error updating avatar:", err));
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
    return api
      .deleteCard(cardIdToDelete)
      .then(() => {
        cardToDelete.deleteCard();
        cardToDelete = null;
        cardIdToDelete = null;
        deletePopup.close();
      })
      .catch((err) => console.error("Error deleting card:", err));
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
    document.forms["profile-form"].name.value = userData.name;
    document.forms["profile-form"].description.value = userData.job;
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});
