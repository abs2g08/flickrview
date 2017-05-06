import { findItemByIds } from '../utils/storeUtil';
import { expect } from 'chai';

describe('Store utility functions', function() {
  it('should find authorId with value 5 in collection', function(done) {
    const collection = [
      { author_id: 2, id: 3 },
      { author_id: 3, id: 1 },
      { author_id: 5, id: 6 }
    ];

    const found = findItemByIds(3, 1, collection);
    expect(found.author_id).to.equal(3);
    expect(found.id).to.equal(1);
    done();
  });
});
