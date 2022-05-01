const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popups = document.querySelectorAll('.popup');
const ProfileEditButton = document.querySelector('.profile__edit-button');
const closeButtonProfile = document.querySelector('.popup__button-res_profile');
const ProfileAddButton = document.querySelector('.profile__addbutton');
const closeButtonCards = document.querySelector('.popup__button-res_cards');
const closeButtonImage = document.querySelector('.popup__button-res_image');
const popupProfile = document.querySelector('.popup-profile');
const popupCards = document.querySelector('.popup_add_item');
const popupZoomImage = document.querySelector('.popup_open-img');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const formProfile = document.forms['forma'];
const InputTypeName = formProfile.querySelector('#input_type_name');
const InputTypeInfo = formProfile.querySelector('#input_type_info');
const formCard = document.forms['formitem'];
const InputTypeNme = formCard.querySelector('#input_type_nme');
const InputTypeLnk = formCard.querySelector('#input_type_lnk');
const Template = document.querySelector('#template').content;
const ElementsPlace = document.querySelector('.elements');
const popupImage = popupZoomImage.querySelector('.popup__image');

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function createCard({link, name}) {
  const cardItem = Template.querySelector('.element').cloneNode(true);
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
    openPopup(popupZoomImage);
    popupImage.src = fnc.target.src;
    popupImage.alt = fnc.target.alt;
    const popupSubtitle = popupZoomImage.querySelector('.popup__subtitle');
    popupSubtitle.textContent = fnc.target.alt;
  });

  return cardItem;
}

function AddFormItem (fnc) {
  fnc.preventDefault();

  const cardItem = createCard({link: InputTypeLnk.value, name: InputTypeNme.value});
  ElementsPlace.prepend(cardItem);
  closePopup(popupCards);
  formCard.reset();
}

function AddFormProfile (fnc) {
  fnc.preventDefault();
  
  profileName.textContent = InputTypeName.value;
  profileInfo.textContent = InputTypeInfo.value;
  closePopup(popupProfile);
}

function renderCards () {
  const htmlContainer = initialCards.map(createCard);
  ElementsPlace.prepend(...htmlContainer);
}
renderCards();

ProfileEditButton.addEventListener('click', () => {
  openPopup(popupProfile);

  InputTypeName.value = profileName.textContent;
  InputTypeInfo.value = profileInfo.textContent;

});

{if(closeButtonProfile)
closeButtonProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
}

ProfileAddButton.addEventListener('click', () => {
  openPopup(popupCards);

});

closeButtonCards.addEventListener('click', () => {
  closePopup(popupCards);
});

closeButtonImage.addEventListener('click', () => {
  closePopup(popupZoomImage);
});

formProfile.addEventListener('submit', AddFormProfile);

formCard.addEventListener('submit', AddFormItem);