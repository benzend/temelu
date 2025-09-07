/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import { Route, Router } from '@solidjs/router';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { Learn } from './pages/Learn';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router>
    <Route path="/learn" component={Learn} />
    <Route path="/posts/:id" component={Post} />
    <Route path="/home" component={Home} />
    <Route path="/" component={Landing} />
  </Router>
), root!);
