import { Router } from '@vaadin/router';
import './routes/todos/page.js';
import './routes/page.js';
import './routes/layout.js';

const router = new Router(document.getElementById('outlet'));

router.setRoutes([
  {
    path: '/',
    component: 'n-main-layout',
    children: [
      {
        path: '/',
        component: 'n-counter-page',
      },
      {
        path: '/todos',
        component: 'n-todos-page',
      },
    ],
  },
]);
