const assert = require('chai').assert;

describe('True should always be true', () => {
  it('!false should return true', done => {
    assert.equal(true, !false);
    done();
  })
})


