# Buildless Single Page App

The project should be an example of how to develop an SPA without a build step and rely on web standards to make development as simple and fast as possible. I was inspired by the [BCE Design](https://github.com/AdamBien/bce.design).

If you are interested in why this approach is worth considering, I can recommend these resources that got me thinking and ultimately creating this project.

- [Vanilla Web: Der Frontend-Trend für 2024?](https://www.youtube.com/watch?v=cttpgBg6pDQ)
- [Web Components mit Adam Bien](https://www.programmier.bar/podcast/deep-dive-125-web-components-mit-adam-bien)
- [Building Complex Apps with plain Web Components](https://www.youtube.com/watch?v=eWRr6c1O2OE)

## Development

1. First install [dependencie](https://github.com/nilsleifeld/buildless-spa/blob/main/libs/README.md).

2. Launch with [browsersync](https://www.browsersync.io):

```sh
browser-sync src -f src --no-notify
```

## Technologies

1. [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), [lit-html](https://github.com/lit/lit/tree/main/packages/lit-html) and [Signals](https://github.com/preactjs/signals)

The application is structured with web components. For support, lit-html is used to efficiently render templates into the DOM. To re-render the web components, signals are used.

These technologies are combined in the [SignalElement](https://github.com/nilsleifeld/buildless-spa/blob/main/src/shared/signal-element.js).
The following shows a counter:

```js
class CounterElement extends SignalElement {
  counter = signal(0);

  view() {
    return html`
      <span>${this.counter.value}</span>
      <button @click=${() => this.counter.value++}>Increment</button>
    `;
  }
}
```

The counter element is extended bei the SignalElement. The SignalElement has the view method that return the html template to renter this component.
Allso has the element a counter signal that is used in the view method. If the signal changes, a new rendering of this component is triggered and the new counter is displayed. You can find more information on exactly how this works in the implementation of the [SignalElement](https://github.com/nilsleifeld/buildless-spa/blob/main/src/shared/signal-element.js).

2. [JSDocs](https://jsdoc.app/) and [`.d.ts` files](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

Since there should be no build step, no TypeScript can be used for a type security. However, this does not mean that you cannot achieve type safety. As an alternative, you can use JSDocs and write d.ts files manually. This does not give the same "beauty" of type anotations but the same security.

3. [Vaadin-Router](https://github.com/vaadin/router)

You can optionally use the vaadin router for routing.
