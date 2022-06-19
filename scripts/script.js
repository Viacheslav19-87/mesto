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
const inputTypeName = formProfile.querySelector('#input-type-name');
const inputTypeInfo = formProfile.querySelector('#input-type-info');
const formCard = document.forms['formitem'];
const inputTypeNme = formCard.querySelector('#input-type-nme');
const inputTypeLnk = formCard.querySelector('#input-type-lnk');
const template = document.querySelector('#template').content;
const elementsPlace = document.querySelector('.elements');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupSubtitle = popupZoomImage.querySelector('.popup__subtitle');
const submitButton = formCard.querySelector('.popup__button-save');

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEsc);
}

function createCard({link, name}) {
  const cardItem = template.querySelector('.element').cloneNode(true);
  const image = cardItem.querySelector('.element__image');
  const title = cardItem.querySelector('.element__title');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const like = cardItem.querySelector('.element__vector');
  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__vector_active');
  });

  const dlt = cardItem.querySelector('.element__delete');
  dlt.addEventListener('click', (evt) => {
    const dltItemCard = evt.target.closest('.element');
    dltItemCard.remove();
  });

  image.addEventListener('click', (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupSubtitle.textContent = evt.target.alt;
    openPopup(popupZoomImage);
  });

  return cardItem;
}

function addFormItem (evt) {
  evt.preventDefault();

  const cardItem = createCard({link: inputTypeLnk.value, name: inputTypeNme.value});
  elementsPlace.prepend(cardItem);
  closePopup(popupCards);
  disabledButtonSubmit(submitButton, config);
  formCard.reset();
}

function addFormProfile (evt) {
  evt.preventDefault();
  
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

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_open')) {
      closePopup(popup);
    }
  })
})

const closePopupEsc = evt => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_open'));
  }
}