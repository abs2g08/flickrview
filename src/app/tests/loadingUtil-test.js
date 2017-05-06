import { loading } from '../utils/loadingUtil';
import { expect } from 'chai';

describe('Loading utility functions', function() {
  it('should merge loading state into store', function(done) {
    loading({
      mergeState: function(obj) {
        expect(obj.loading).to.equal(true);
        done();
      }
    });
  });
});
