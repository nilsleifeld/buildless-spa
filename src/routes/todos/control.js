import { todos } from './entity.js';

/** @param {string} todoId */
export function deleteTodo(todoId) {
  todos.value = todos.value.filter((t) => t.id !== todoId);
}

/**
 * @param {string} todoId
 * @param {string} text
 */
export function changeTodoText(todoId, text) {
  todos.value = todos.value.map((todo) => (todo.id === todoId ? { ...todo, text: text } : todo));
}

/** @param {string} text */
export function addTodo(text) {
  todos.value = [
    ...todos.value,
    {
      text: text,
      completed: false,
      id: uniqId(),
    },
  ];
}

function uniqId() {
  return Date.now().toString();
}
