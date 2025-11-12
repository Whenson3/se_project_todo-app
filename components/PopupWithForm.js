import Popup from './Popups.js';

class PopupWithForm extends Popup{
    constructor({ popupSelector, handleFormSubmit }){
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._inputList = this.popupForm.querySelectorAll(".popup__input");

        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        })
        return values;   
    }

    setEventListeners() {
        super.setEventListeners();
         this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();

            this._handleFormSubmit(inputValues);    
            this._handleFormSubmit(evt);
        });
    }
}
export default PopupWithForm;