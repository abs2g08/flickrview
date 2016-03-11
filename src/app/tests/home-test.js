import React from 'react';
import { Router } from 'react-router';
import Routes from '../Routes';
import { render, unmountComponentAtNode } from 'react-dom';
import createHistory from 'history/lib/createMemoryHistory';
import expect from 'expect';

let node;

describe('as a User I should be able to navigate to the home page and view its content', ()=> {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node)
  })

  it('should render list of flickr items', (done) => {
    render((
      <Router history={createHistory('/home')}>
        {Routes}
      </Router>
    ), node, ()=> {
      if(node.getElementsByClassName('feed-item').length > 0) {
        done();
      }
    })
  });
});

//TO-DO: add more tests for React components
