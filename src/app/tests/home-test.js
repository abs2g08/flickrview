import React from 'react';
import { Router, createMemoryHistory } from 'react-router';
import { render, unmountComponentAtNode } from 'react-dom';
import Routes from '../Routes';
import { expect } from 'chai';

let node;

describe('as a User I should be able to navigate to the home page and view its content', function() {
  beforeEach(()=> {
    node = document.createElement('div');
  });
  afterEach(()=> {
    unmountComponentAtNode(node)
  })

  it('should render the home page', function(done) {
    render((
      <Router history={createMemoryHistory('/home')}>
        {Routes}
      </Router>
    ), node, function() {
      // check if the home-view container loads
      const homeView = node.getElementsByClassName('home-view');

      expect(homeView).not.to.be.an('undefined');
      expect(homeView).to.have.length.above(0);
      done();
    })
  });
});
