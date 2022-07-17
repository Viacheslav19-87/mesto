import { Card } from "../components/Card.js";
import { initialCards } from "../utils/data.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import '../pages/index.css';
import UserInfo from "../components/UserInfo.js";
import {
elementTemplate,
profileName,
profileInfo,
topInputProfile,
bottomInputProfile,
inputPlaceNameNewPlace,
inputLinkNewPlace,
inputImage,
inputImageName,
profileEditButton,
buttonOpenPopupCards,
formElementProfile,
formElementNewPlace,
}
from "../utils/constants.js";

const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-err-active'
};

const profileValidator = new FormValidator(classListObject, formElementProfile);
const cardValidator = new FormValidator(classListObject, formElementNewPlace);

profileValidator.enableValidation();
cardValidator.enableValidation();

const openPopupImage = new PopupWithImage('.popup_open-img');
openPopupImage.setEventListeners();

function generateCard(data) {
  const card = new Card(data, elementTemplate, () => {
    openPopupImage.open(data.name, data.link);
  });
  return card.createCard()
}

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    section.addItem(generateCard(data));
  }
}, '.elements');

section.renderItems();

const userInfo = new UserInfo({
  title: profileName,
  subtitle: profileInfo,
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup-profile",
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
    popupProfile.close();
  },
});

popupProfile.setEventListeners();

const popupImage = new PopupWithForm({
  popupSelector: ".popup_add-item",

  handleFormSubmit() {
    const card = generateCard({
      name: inputPlaceNameNewPlace.value,
      link: inputLinkNewPlace.value
    });

    section.addItem(card);
    popupImage.close();
  }
});

popupImage.setEventListeners();

profileEditButton.addEventListener("click", () => {
 popupProfile.open();
 profileValidator.resetError();
});

buttonOpenPopupCards.addEventListener("click", () => {
  popupImage.open();
  cardValidator.resetError();
  inputImageName.value = '';
  inputImage.value = '';
});