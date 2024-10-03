import { render as litRender } from 'lit-html';
import { effect } from '@preact/signals-core';

/**
 * A base class for creating custom elements with signals.
 * The class provides a reactive rendering mechanism using signals.
 * When a signal that is used in the view of the element changes,
 * the element will automatically re-render.
 *
 * @extends {HTMLElement}
 *
 * @example <caption>Creating a simple counter element</caption>
 * <pre><code>
 * class CounterElement extends SignalElement {
 *  count = signal(0);
 *
 *  view() {
 *   return html`
 *    <button \@click=${() => this.count.value++}>
 *        ${this.count.value}
 *      </button>
 *    `;
 *  }
 * }
 * </code></pre>
 */
export default class SignalElement extends HTMLElement {
  /**
   * @type Array<function(): void>
   */
  disconnectedCallbacks = [];

  /**
   * Returns the template of the element.
   *
   * @abstract
   * @returns {import('lit-html').TemplateResult}
   *
   * @example
   * view() {
   *  return html`<div>Hello, World!</div>`;
   * }
   */
  view() {
    throw new Error('Not implemented');
  }

  connectedCallback() {
    this.onDisconnect(effect(() => this.render()));
  }

  /**
   * Register a disconnect callback.
   * @param {function(): void} fn
   */
  onDisconnect(fn) {
    this.disconnectedCallbacks.push(fn);
  }

  disconnectedCallback() {
    this.disconnectedCallbacks.forEach((fn) => fn());
  }

  render() {
    if (this.shadowRoot) {
      litRender(this.view(), this.shadowRoot);
    } else {
      litRender(this.view(), this);
    }
  }

  /**
   * @param {string} _name
   * @param {any} oldValue
   * @param {any} newValue
   */
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this.render();
  }
}
