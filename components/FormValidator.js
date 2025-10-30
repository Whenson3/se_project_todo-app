class FormValidator {
    constructor(settings, formEl) {
        if (!settings || !formEl) {
            throw new Error('Both settings and form element are required');
        }
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
        this._buttonElement = null;
    }

  _setEventListeners() {
      this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector)
      );
      this._buttonElement = this._formEl.querySelector(
        this._submitButtonSelector
      );

      if (!this._buttonElement) {
          console.warn(`Submit button with selector "${this._submitButtonSelector}" not found`);
          return;
      }

      this._toggleButtonState(this._inputList, this._buttonElement);

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputList, buttonElement);
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

    resetValidation() {
        if (!this._inputList || !this._buttonElement) return;

        this._inputList.forEach((inputElement) => {
            const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
            this._hideInputError(inputElement, errorElement);
        });

        this._toggleButtonState(this._inputList, this._buttonElement);
    }

    clearForm() {
        this._formEl.reset();
        this.resetValidation();
    }
}

export default FormValidator;