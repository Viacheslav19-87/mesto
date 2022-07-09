import { initialCards } from "./data.js";
import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js";
const classListObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-err-active'
};
const profileEditButton = document.querySelector('.profile__edit-button'); //+
const popupProfile = document.querySelector('.popup-profile');
const buttonClosePopupProfile = document.querySelector('.popup__button-res');
const formElementProfile = popupProfile.querySelector('.popup__form_type_profile');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_info');
const popupCards = document.querySelector('.popup_add-item');
const buttonOpenPopupCards = document.querySelector('.profile__addbutton');
const buttonClosePopupCards = popupCards.querySelector('.popup__button-res');
const elementsPlace = document.querySelector('.elements');
const formElementNewPlace = popupCards.querySelector('.popup__form_cards');
const inputPlaceNameNewPlace = formElementNewPlace.querySelector('.popup__form-item-type-name');
const inputLinkNewPlace = formElementNewPlace.querySelector('.popup__form-item-type-job');
export const popupZoomImage = document.querySelector('.popup_open-img');
export const popupImage = document.querySelector('.popup__image');
export const popupSubtitle = document.querySelector('.popup__subtitle');
const popupImageClose = document.querySelector('.popup__button-res_image');
const profileValidator = new FormValidator(classListObject, formElementProfile);
const cardValidator = new FormValidator(classListObject, formElementNewPlace);



export function openPopup(item) {
  item.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(item) {
  item.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEsc);
};

function addFormProfile  (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupProfile);
  profileValidator.disabledButtonSubmit();
};

function createCard(cardElement) {
  const card = new Card(cardElement, '#template');
  const cardItem = card.generateCard();
  return cardItem;
}

function renderCards(cardElement) {
  const userCard = createCard(cardElement);
  elementsPlace.prepend(userCard);
}

function renderDefaultCard(cardElement) {
  const defaultCard = createCard(cardElement);
  elementsPlace.prepend(defaultCard);
}

const handleAddCardsSubmit = evt => {
  evt.preventDefault();

  const itemInput = {
    name: inputPlaceNameNewPlace.value,
    link: inputLinkNewPlace.value
  };

  renderCards(itemInput);
  closePopup(popupCards);
  formElementNewPlace.reset();
  cardValidator.disabledButtonSubmit();
};

initialCards.forEach((cardElement) => {
  renderDefaultCard(cardElement);
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupProfile);
  profileValidator.resetError();
});

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

formElementProfile.addEventListener('submit', addFormProfile);

buttonOpenPopupCards.addEventListener('click', () => {
  openPopup(popupCards);
});

buttonClosePopupCards.addEventListener('click', () => {
  closePopup(popupCards);
});

popupImageClose.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

popupProfile.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupProfile);
  }
});

popupCards.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupCards);
  }
});

popupZoomImage.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup')) {
    closePopup(popupZoomImage);
  }
});

formElementNewPlace.addEventListener('submit', handleAddCardsSubmit);

const closePopupEsc = (evt) => {
    if(evt.key === 'Escape') {
      const allPopupOpen = document.querySelector('.popup_open')
      closePopup(allPopupOpen);
    }
};

profileValidator.enableValidation();
cardValidator.enableValidation();