import { html } from 'lit-html';
import { signal, batch } from '@preact/signals-core';
import SignalElement from '../../shared/signal-element.js';
import { todos, todoCount } from './entity.js';
import { addTodo, changeTodoText, deleteTodo } from './control.js';
import { title } from './../../state/head.js';

/** @typedef {import('types').TodoItemChangeTextEventDetail} TodoItemChangeTextEventDetail */

class TodosPage extends SignalElement {
  constructor() {
    super();
    this.text = signal('');
    title.value = 'Todos';
  }

  view() {
    return html`
      <main class="container">
        <article>
          <header>Todos (${todoCount.value})</header>
          <form @submit=${(/** @type SubmitEvent */ e) => this.submitTodo(e)}>
            <fieldset role="group">
              <input
                @input="${(/** @type InputEvent */ e) =>
                  (this.text.value = /** @type HTMLInputElement */ (e.target).value)}"
                .value="${this.text.value}"
                type="text"
                placeholder="Todo ..."
              />
              <button type="submit">Add</button>
            </fieldset>
          </form>

          <div>
            ${todos.value.map(
              (todo) =>
                html`<n-todo
                  text=${todo.text}
                  @changeText=${(/** @type CustomEvent<TodoItemChangeTextEventDetail> */ e) =>
                    changeTodoText(todo.id, e.detail.text)}
                  @delete=${() => deleteTodo(todo.id)}
                /> `,
            )}
          </div>
        </article>
      </main>
    `;
  }

  /** @param {SubmitEvent} event */
  submitTodo(event) {
    event.preventDefault();

    batch(() => {
      addTodo(this.text.value);
      this.text.value = '';
    });
  }
}

class TodoElement extends SignalElement {
  static get observedAttributes() {
    return ['text'];
  }

  text = () => this.getAttribute('text');

  view() {
    return html`
      <fieldset role="group">
        <input
          @input="${(/** @type {InputEvent}*/ e) => this.changeText(e)}"
          .value="${this.text()}"
          type="text"
          placeholder="Todo ..."
        />
        <button class="outline" @click="${() => this.dispatchEvent(new CustomEvent('delete'))}">Delete</button>
      </fieldset>
    `;
  }

  /** @param {InputEvent} event */
  changeText(event) {
    const target = /** @type {HTMLInputElement}  */ (event.target);
    /** @type {import('types').TodoItemChangeTextEventDetail} */
    const detail = { text: target.value };
    this.dispatchEvent(new CustomEvent('changeText', { detail: detail }));
  }
}

customElements.define('n-todos-page', TodosPage);
customElements.define('n-todo', TodoElement);
