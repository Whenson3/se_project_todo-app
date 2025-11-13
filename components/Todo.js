class Todo {
  constructor(data, template, handleCheck, onDelete) {
    this._data = data;
    this._templateElement = document.querySelector(template);
    this._handleCheck = handleCheck;
    this._onDelete = onDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      const newState = this._todoCheckboxEl.checked;
      this._data.completed = newState;
      if (typeof this._handleCheck === 'function') {
        this._handleCheck(newState);
      }
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      if (typeof this._onDelete === 'function') {
        this._onDelete(this._data.id);
      }
    });
  }

  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  generateDueDate() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    
    this.generateCheckboxEl();
    this._setEventListeners();
    this.generateDueDate();
    
    return this._todoElement;
  }
}

export default Todo;