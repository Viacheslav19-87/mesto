let popup = document.querySelector(".popup");
let openPopup = document.querySelector(".profile__edit-button");
let closePopup = popup.querySelector(".popup__button-res");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_info");
let profileName = document.querySelector(".profile__title");
let profileInfo = document.querySelector(".profile__subtitle");

function popupOpen() {
  popup.classList.toggle('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

openPopup.addEventListener('click', popupOpen);

function popupClose() {
  popup.classList.toggle('popup_open');
}

closePopup.addEventListener('click', popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);