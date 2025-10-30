class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;

    }

  _setEventListeners() {
      const inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
      const buttonElement = this._formEl.querySelector(
        this._submitButtonSelector
      );

      this._toggleButtonState(inputList, buttonElement);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
  }

  _checkInputValidity(inputElement) {
      const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
      
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, errorElement, inputElement.validationMessage);
      } else {
          this._hideInputError(inputElement, errorElement);
      }
  }

  _showInputError(inputElement, errorElement, errorMessage) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
  }

  _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
      } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
      }
  }

  _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => !inputElement.validity.valid);
  }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
          evt.preventDefault();
     });
    this._setEventListeners();
 }
  }


export default FormValidator;