const todoList = document.querySelector('#todo');
const form = document.querySelector('#form');

const state = JSON.parse(localStorage.getItem('tasks'));

const updateLocalStorage = (updatedTasks) => {
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

const addRemoveButton = (task) => (task.completed
  ? `<button class="button-remove" onclick="removeTask(${task.id})">Remove</button>`
  : '');

const taskHTML = (task) => `
<li class="todo__item ${task.completed && 'todo__item-completed'}" 
    onclick="toggleComplete(${task.id})">
  <div class="todo__item__content">
    <p class="title">${task.title}</p>
    <p class="desc">${task.description}</p>
  </div>
  ${addRemoveButton(task)}
</li>
`;

const renderTodo = () => {
  const todo = JSON.parse(localStorage.getItem('tasks'));
  todoList.innerHTML = '';
  todo.forEach((el) => {
    todoList.innerHTML += taskHTML(el);
  });
};
const addTask = (title, description) => {
  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };
  state.push(newTask);
  updateLocalStorage(state);
  renderTodo();
};

const toggleComplete = (id) => {
  const index = state.findIndex((el) => el.id === id);
  if (index === -1) {
    return;
  }
  const { completed } = state[index];
  state[index].completed = !completed;
  updateLocalStorage(state);
  renderTodo();
};

const removeTask = (id) => {
  const index = state.findIndex((el) => el.id === id);
  state.splice(index, 1);
  updateLocalStorage(state);
  renderTodo();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#input__title');
  const description = document.querySelector('#input__desc');
  addTask(title.value, description.value);
  title.value = '';
  description.value = '';
});

renderTodo();
