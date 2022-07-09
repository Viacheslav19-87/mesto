import { popupZoomImage, popupImage, popupSubtitle, openPopup } from "./index.js"

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _addListeners() {
    this._element.querySelector('.element__vector').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  _like() {
    this._element.querySelector('.element__vector').classList.toggle('element__vector_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupSubtitle.textContent = this._name;
    openPopup(popupZoomImage);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._addListeners();
    return this._element;
  }
}