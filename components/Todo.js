class Todo {
    constructor(data, template) {
        this._data = data;
        this._templateElement = document.querySelector(template);
    }

    getView() {
      this._todoElement = this._templateElement.content
        .querySelector(".todo")
        .cloneNode(true);


      const todoNameEl = this._todoElement.querySelector(".todo__name");
      const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
      const todoLabel = this._todoElement.querySelector(".todo__label");
      const todoDate = this._todoElement.querySelector(".todo__date");
      const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

      todoNameEl.textContent = this._data.name;

      return this._todoElement;
    }
}

export default Todo;