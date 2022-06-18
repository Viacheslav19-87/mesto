const popups = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__button-res_profile');
const profileAddButton = document.querySelector('.profile__addbutton');
const closeButtonCards = document.querySelector('.popup__button-res_cards');
const closeButtonImage = document.querySelector('.popup__button-res_image');
const popupProfile = document.querySelector('.popup-profile');
const popupCards = document.querySelector('.popup_add-item');
const popupZoomImage = document.querySelector('.popup_open-img');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const formProfile = document.forms['forma'];
const inputTypeName = formProfile.querySelector('#input_type_name');
const inputTypeInfo = formProfile.querySelector('#input_type_info');
const formCard = document.forms['formitem'];
const inputTypeNme = formCard.querySelector('#input_type_nme');
const inputTypeLnk = formCard.querySelector('#input_type_lnk');
const template = document.querySelector('#template').content;
const elementsPlace = document.querySelector('.elements');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupSubtitle = popupZoomImage.querySelector('.popup__subtitle');

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function createCard({link, name}) {
  const cardItem = template.querySelector('.element').cloneNode(true);
  const image = cardItem.querySelector('.element__image');
  const title = cardItem.querySelector('.element__title');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const like = cardItem.querySelector('.element__vector');
  like.addEventListener('click', (fnc) => {
    fnc.target.classList.toggle('element__vector_active');
  });

  const dlt = cardItem.querySelector('.element__delete');
  dlt.addEventListener('click', (fnc) => {
    const dltItemCard = fnc.target.closest('.element');
    dltItemCard.remove();
  });

  image.addEventListener('click', (fnc) => {
    popupImage.src = fnc.target.src;
    popupImage.alt = fnc.target.alt;
    popupSubtitle.textContent = fnc.target.alt;
    openPopup(popupZoomImage);
  });

  return cardItem;
}

function addFormItem (fnc) {
  fnc.preventDefault();

  const cardItem = createCard({link: inputTypeLnk.value, name: inputTypeNme.value});
  elementsPlace.prepend(cardItem);
  closePopup(popupCards);
  formCard.reset();
}

function addFormProfile (fnc) {
  fnc.preventDefault();
  
  profileName.textContent = inputTypeName.value;
  profileInfo.textContent = inputTypeInfo.value;
  closePopup(popupProfile);
}

function renderCards () {
  const htmlContainer = initialCards.map(createCard);
  elementsPlace.prepend(...htmlContainer);
}
renderCards();

profileEditButton.addEventListener('click', () => {
  inputTypeName.value = profileName.textContent;
  inputTypeInfo.value = profileInfo.textContent;
  openPopup(popupProfile);
  resetError(popupProfile);
});

{if(buttonCloseProfile)
buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
}

profileAddButton.addEventListener('click', () => {
  openPopup(popupCards);

});

closeButtonCards.addEventListener('click', () => {
  closePopup(popupCards);
});

closeButtonImage.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

formProfile.addEventListener('submit', addFormProfile);

formCard.addEventListener('submit', addFormItem);

function resetError(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  formInputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });
}

popups.forEach(popup => {
  popup.addEventListener('click', (fnc) => {
    if (fnc.target.classList.contains('popup_open')) {
      closePopup(popup);
    }
  })
})

document.addEventListener('keydown', (fnc) => {
  if (fnc.code === 'Escape') {
    popups.forEach(popup => {
      if (popup.classList.contains('popup_open')) {
        closePopup(popup);
      }
    });
  }
});