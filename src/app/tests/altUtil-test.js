import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';
import { expect } from 'chai';

describe('Alt utility functions', function() {
  it('should add "test", "testSuccess" and "testError" methods to TestActions', function(done) {
    class TestActions {
      constructor() {
        generateAjaxActions(this, ['test'])
        this.generateActions('testMe');
      }
    }

    const inst = alt.createActions(TestActions);
    expect(inst.test).to.be.a('function');
    expect(inst.testSuccess).to.be.a('function');
    expect(inst.testError).to.be.a('function');
    done();
  });
});
