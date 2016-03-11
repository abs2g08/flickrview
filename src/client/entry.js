import React from 'react';
import { render } from 'react-dom';
import Routes from '../app/Routes';
import { Router, browserHistory } from 'react-router';
import alt from '../app/alt';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
import Iso from 'iso';

// Favicon
import '../favicon.ico';

// Comp styles
import '../app/components/feed.scss';
import '../app/components/item-detail.scss';

// Redundant includes to trigger live reload
import '../app/styles/vendor.scss';
import '../app/styles/variables.scss';
import '../app/styles/app.scss';

//const browserHistory = createBrowserHistory();

// boostrap flux stores
Iso.bootstrap((state) => {
  console.log('bootsrapping data...');
  alt.bootstrap(JSON.stringify({
    LoginStore: {
      isLoggedIn: state.isLoggedIn,
      user: state.user
    }
  }));
});

render(
  <Router history={browserHistory}>
    {Routes}
  </Router>,
  document.getElementById('app')
)
