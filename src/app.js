'use strict';

// Variables
const todoContainer = document.querySelector('.todo-container');
const input = todoContainer.querySelector('input');
let todos;
let todosID;

// Reset input on reload
input.value = '';

if (localStorage.todosArray) {
  // Get data from local storage
  todos = JSON.parse(localStorage.getItem('todosArray'));
  // Display a todo from each object in the local storage
  todos.forEach((todo, i) => displayFromLocal(todo.todoText, i));
  // Update ID
  todosID = todos.length;
} else {
  // Todos as an empty array
  todos = [];
  // Reset ID
  todosID = 0;
}

// Functions

const insertTodo = (todoText, todoID) => {
  // HTML template for the todo item
  const todo = `<div class="todo" data-id=${todoID}>
  <p class="todo-text">${todoText}</p>
  <div class="todo-icons">
  <button><i class="far fa-check-circle"></i></button>
  <button><i class="far fa-times-circle"></i></button>
  </div>
  </div>`;
  // Insert to DOM
  todoContainer.insertAdjacentHTML('beforeend', todo);
  // Push an object to the todos array
  todos.push({ todoID, todoText });
  // Set item on local Storage
  localStorage.setItem('todosArray', JSON.stringify(todos));
  // Update ID
  todosID = todos.length;
  // Clear input
  input.value = '';
};

const removeTodo = todoItem => {
  // Get ID from the data set of the item
  const todoItemID = Number(todoItem.dataset.id);
  // Find its index on the todos array
  const todo = todos.findIndex(todo => todo.todoID === todoItemID);
  // Remove it from the todos array using its index and splice one element
  todos.splice(todo, 1);
  // Remove the item from the DOM
  todoItem.remove();
  // Update ID
  todosID = todos.length;
  // Update local storage with the new todos array
  localStorage.todosArray = JSON.stringify(todos);
};

function displayFromLocal(todoText, todoID) {
  // HTML template
  const todo = `<div class="todo" data-id=${todoID}>
  <p class="todo-text">${todoText}</p>
  <div class="todo-icons">
  <button><i class="far fa-check-circle"></i></button>
  <button><i class="far fa-times-circle"></i></button>
  </div>
  </div>`;
  // Insert to DOM
  todoContainer.insertAdjacentHTML('beforeend', todo);
}

// Events

input.addEventListener('keydown', event => {
  // Guard clause on Enter key
  if (event.key !== 'Enter') return;
  //Insert to the DOM
  insertTodo(input.value, todosID);
});

// DOM traversing
todoContainer.addEventListener('click', event => {
  const button = event.target;
  // Check if the click was on an icon
  if (!button.classList.contains('far')) return;
  // Get todo item traversing to the parent of the button
  const todoItem = button.closest('.todo');
  // If check button is clicked call checkTodo else call removeTodo
  button.classList.contains('fa-check-circle')
    ? checkTodo(todoItem)
    : removeTodo(todoItem);

  // Update ID
  todosID = todos.length;
});

const checkTodo = todoItem => {
  // Toggle completed class on the todo item
  todoItem.classList.toggle('completed');
};
