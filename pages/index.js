import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig} from "../utils/constant.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm( { 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: () => {}, 
});

addTodoPopup.setEventListeners();


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});



// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;


//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   const todoElement = generateTodo(values);
//   section.addItem(todoElement);
//   evt.target.reset();
//   closeModal(addTodoPopupEl);

//   addTodoFormValidator.resetValidation();

//   addTodoPopup.close();
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();