import {
  Card
} from "../components/Card.js";
import {
  initialCards
} from "../utils/data.js";
import {
  FormValidator
} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import '../pages/index.css';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import {
  buttonAvatarEdit,
  profileName,
  profileInfo,
  topInputProfile,
  bottomInputProfile,
  profileEditButton,
  buttonOpenPopupCards,
  formElementProfile,
  formElementNewPlace,
  formElementAvatar
}
from "../utils/constants.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '819eb072-1860-43c5-9155-10d10df12136',
    'Content-Type': 'application/json'
  }
});

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
const avatarValidation = new FormValidator(classListObject, formElementAvatar)

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidation.enableValidation();

const openPopupImage = new PopupWithImage('.popup_open-img');
openPopupImage.setEventListeners();

const userInfo = new UserInfo({
  title: profileName,
  subtitle: profileInfo,
  avatarSelector: '.profile__avatar-img'
});

function createCard(item) {
  const card = new Card({
      name: item.name,
      link: item.link,
      userId: userInfo.getUserId(),
      ownerId: item.owner._id,
      cardId: item._id,
      likes: item.likes,
      handleCardClick: () => {
        openPopupImage.open(item);
      },
      handleCardDelete: () => {
        popupWithConfirm.open(card);
      },
      handleCardLike: () => {
        const cardIsLike = card.setOwnLike();
        const toggleCardLike = cardIsLike ?
          api.unlikeCard(card.getCardId()) :
          api.likeCard(card.getCardId());
        toggleCardLike
          .then((res) => {
            card.setLikes(res.likes);
            card.renderLikes();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    '#template'
  );
  const generatedCard = card.generateCard();
  return generatedCard;
};

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    section.addItem(createCard(item));
  }
}, '.elements');

const popupWithProfile = new PopupWithForm({
  popupSelector: '.popup-profile',
  handlerSubmit: (item) => {
    const submitBottonText = popupWithProfile.getSubmitBottonText();
    popupWithProfile.setLoadingText('Сохранение...');
    api.setUserData(item)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithProfile.setLoadingText(submitBottonText);
      })
  }
});
popupWithProfile.setEventListeners();

const popupWithAvatar = new PopupWithForm({
  popupSelector: '.popup_refresh_avatar',
  handlerSubmit: (item) => {
    const submitBottonText = popupWithAvatar.getSubmitBottonText();
    popupWithAvatar.setLoadingText('Сохранение...');
    api.editProfileAvatar(item)
      .then((res) => {
        userInfo.setUserInfo(res)
        popupWithAvatar.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAvatar.setLoadingText(submitBottonText);
      })
  }
});
popupWithAvatar.setEventListeners();

const popupCreateCard = new PopupWithForm({
  popupSelector: '.popup_add-item',
  handlerSubmit: (item) => {
    const submitBottonText = popupCreateCard.getSubmitBottonText();
    popupCreateCard.setLoadingText('Создание...')
    api.addNewCard(item)
      .then((res) => {
        const card = createCard(res);
        section.addItem(card);
        popupCreateCard.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupCreateCard.setLoadingText(submitBottonText);
      })
  }
});
popupCreateCard.setEventListeners();

const popupWithConfirm = new PopupWithConfirmation({
  popupSelector: '.popup_delete',
  handlerSubmit: (card) => {
    const submitBottonText = popupWithConfirm.getSubmitBottonText();
    popupWithConfirm.setLoadingText('Удаление...');
    api.deleteCard(card.getCardId())
      .then(res => {
        card.deleteCard();
        popupWithConfirm.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupWithConfirm.setLoadingText(submitBottonText);
      })
  }
})
popupWithConfirm.setEventListeners();

function openProfile() {
  const getUserInfo = userInfo.getUserInfo();
  topInputProfile.value = getUserInfo.title
  bottomInputProfile.value = getUserInfo.subtitle
  popupWithProfile.open();
  profileValidator.resetError();
};

function openCard() {
  popupCreateCard.open();
  cardValidator.resetError();
};

function openAvatar() {
  popupWithAvatar.open();
  // avatarValidation.resetError();
};

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([UserProfileData, initialCards]) => {
    userInfo.setUserInfo(UserProfileData);
    section.renderItems(initialCards);
  })
  .catch(err => {
    console.log(err);
  })

buttonAvatarEdit.addEventListener('click', openAvatar);
profileEditButton.addEventListener('click', openProfile);
buttonOpenPopupCards.addEventListener('click', openCard);