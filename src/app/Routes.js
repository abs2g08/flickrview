import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import {
  HomeView,
  DetailView,
  NotFoundView
} from './views';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomeView}/>
    <Route path='home' component={HomeView}/>
    <Route path='detail/:authorId/:itemId' component={DetailView}/>
    <Route path='*' component={NotFoundView}/>
  </Route>
);
