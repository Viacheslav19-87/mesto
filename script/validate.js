const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-err-active'
};


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disabledButtonSubmit(buttonElement, config);
  } else {
    enabledButtonSubmit(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    toggleButtonState(inputList, buttonElement, config);
    checkInputValidity(formElement, inputElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  setEventListener(formElement, config);
  });
}

function disabledButtonSubmit(buttonElement, config) {
  buttonElement.setAttribute('disabled', 'disabled');
  buttonElement.classList.add(config.inactiveButtonClass);
};

function enabledButtonSubmit(buttonElement, config) {
  buttonElement.removeAttribute('disabled', 'disabled');
  buttonElement.classList.remove(config.inactiveButtonClass);
};

const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
 
 
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function resetError(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  formInputs.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

enableValidation(config);