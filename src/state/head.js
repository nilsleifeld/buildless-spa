import { signal } from '@preact/signals-core';
import { effect } from '@preact/signals-core';

export const title = signal('');

effect(() => {
  document.title = title.value;
});
