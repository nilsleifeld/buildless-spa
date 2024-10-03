import SignalElement from './../shared/signal-element.js';
import { signal } from '@preact/signals-core';
import { html } from 'lit-html';
// @ts-ignore
import style from './page.css' with { type: 'css' };
import { title } from './../state/head.js';

class CounterPage extends SignalElement {
  constructor() {
    super();
    this.counter = signal(0);
    // @ts-ignore
    document.adoptedStyleSheets = [style];

    title.value = 'Counter';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  view() {
    return html`
      <main class="container">
        <article>
          <header>Counter</header>
          <div class="grid">
            <p class="counter-text">${this.counter.value}</p>
            <button @click=${() => this.counter.value++}>Increment</button>
          </div>
        </article>
      </main>
    `;
  }
}

customElements.define('n-counter-page', CounterPage);
