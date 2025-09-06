/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import { Route, Router } from '@solidjs/router';
import { Landing } from './Landing';
import { Home } from './Home';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Router>
         <Route path="/" component={Landing} />
         <Route path="/home" component={Home} />
       </Router>, root!);
