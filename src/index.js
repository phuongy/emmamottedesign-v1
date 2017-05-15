import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRedirect, Route, browserHistory } from 'react-router';

import App from './App';
import Home from './Home';
import Project from './Project';
import NotFound from './NotFound';

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  } else {
    window.scrollTo(0, 0);
  }
}

ReactDOM.render(
  <Router onUpdate={() => hashLinkScroll()} history={browserHistory}>
    <Route name="App" path="/" component={App}>
      <Route name="Home" path="home" component={Home} />
      <Route name="Projects" path="project/:slug" component={Project} />
      <Route name="404" path="*" component={NotFound} />
      <IndexRedirect to="home" />
    </Route>
  </Router>,
  document.getElementById('root')
);

document.querySelector('body').className = 'loaded';