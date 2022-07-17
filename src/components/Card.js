export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _addListeners() {
    this._element.querySelector('.element__vector').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _like() {
    this._element.querySelector('.element__vector').classList.toggle('element__vector_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  createCard() {
    this._element = this._cardSelector.content.querySelector('.element').cloneNode(true);
    this._elementLike = this._element.querySelector('.element__vector');
    this._elementImage = this._element.querySelector('.element__image');
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._addListeners();
    return this._element;
  }

}