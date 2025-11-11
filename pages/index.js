import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig} from "../utils/constant.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const addTodoPopup = new PopupWithForm( { 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: () => {}, 
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const openModal = (modal) => {
  if (!modal) return;
  
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  };

  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
  
  // Store the handler reference for cleanup
  modal._handleEscClose = handleEscClose;
};

const closeModal = (modal) => {
  if (!modal) return;
  
  modal.classList.remove("popup_visible");
  
  // Remove escape key listener
  if (modal._handleEscClose) {
    document.removeEventListener("keydown", modal._handleEscClose);
    delete modal._handleEscClose;
  }
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;


  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todoElement = generateTodo(values);
  section.addItem(todoElement);
  evt.target.reset();
  closeModal(addTodoPopupEl);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();