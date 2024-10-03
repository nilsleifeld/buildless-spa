import { signal, computed, effect } from '@preact/signals-core';

/** @typedef {import('types').Todo} Todo */

const todos = signal(loadTodosFromStore());
const todoCount = computed(() => todos.value.length);

/**
 * @returns {Todo[]}
 */
function loadTodosFromStore() {
  const todos = localStorage.getItem('todos');

  if (!todos) {
    return [];
  }

  return JSON.parse(todos);
}

effect(() => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
});

export { todos, todoCount };
