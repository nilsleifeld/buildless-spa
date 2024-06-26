import { signal } from '@preact/signals';
import { effect } from '@preact/signals';

export const title = signal('');

effect(() => {
  document.title = title.value;
});
