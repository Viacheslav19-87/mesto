export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this.disabledButtonSubmit();
    }else{
      this._enabledButtonSubmit();
    }
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }else{
      this._hideInputError(inputElement);
    }
  };

  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  resetError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disabledButtonSubmit() {
    this._buttonElement.setAttribute('disabled', 'disabled');
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enabledButtonSubmit() {
    this._buttonElement.removeAttribute('disabled', 'disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };

  _showInputError(inputElement) {
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._error.textContent = inputElement.validationMessage;
    this._error.classList.add(this._errorClass)
  };

  _hideInputError(inputElement) {
    this._error = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  };

  enableValidation() {
    this._setEventListener();
  }
}