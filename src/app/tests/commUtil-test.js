import { genKey } from '../utils/commUtil';
import { expect } from 'chai';

describe('Comm utility functions', function() {
  it('should create a key "testClass_5"', function(done) {

    const key = genKey('testClass', 5);
    expect(key).to.equal('testClass_5');
    done();
  });
});
