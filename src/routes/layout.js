import SignalElement from './../shared/signal-element.js';
import { html } from 'lit-html';

class MainLayout extends SignalElement {
  view() {
    return html`
      <header class="container">
        <nav>
          <ul>
            <li><strong>Acme Corp</strong></li>
          </ul>
          <ul>
            <li><a href="/">Counter</a></li>
            <li><a href="/todos">Todos</a></li>
          </ul>
        </nav>
      </header>
      <slot></slot>
    `;
  }
}

customElements.define('n-main-layout', MainLayout);
