export class Card {
  constructor({
    name,
    link,
    userId,
    ownerId,
    cardId,
    likes,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  }, cardSelector) {
    this._name = name;
    this._link = link;
    this._userId = userId;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._likes = likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._cardSelector = cardSelector;
  }

  _addListeners() {
    this._like.addEventListener('click', this._handleCardLike);
    this._deleteButton.addEventListener('click', this._handleCardDelete);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  };

  getCardId() {
    return this._cardId;
  }

  setOwnLike() {
    return this._likes.some(like => {
      return like._id === this._userId;
    });
  }

  toggleLikeState() {
    if (this.setOwnLike()) {
      this._cardButtonLike.classList.add('element__vector_active');
    } else {
      this._cardButtonLike.classList.remove('element__vector_active');
    }
  }

  renderLikes() {
    this._likesCounter.textContent = this._likes.length;
    this.toggleLikeState();
  }

  setLikes(newLikes) {
    this._likes = newLikes;
  }


  _deleteCard() {
    this._element.remove();
    this._element = null;
  }


  _checkStateDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.classList.add('element__delete-inactive');
    } else {
      this._deleteButton.classList.remove('element__delete-inactive');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._like = this._element.querySelector('.element__vector');
    this._cardImage = this._element.querySelector('.element__image');
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardButtonLike = this._element.querySelector('.element__vector');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesCounter = this._element.querySelector('.element__likes');
    this._addListeners();
    this._checkStateDeleteButton()
    this.renderLikes()

    return this._element;
  };

}