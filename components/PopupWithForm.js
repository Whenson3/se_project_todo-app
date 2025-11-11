import Popup from './Popups.js';

class PopupWithForm extends Popup{
    constructor({ popupSelector, handleFormSubmit }){
        super({ popupSelector });
    }
}
export default PopupWithForm;