var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /friends', function testSlash(done) {
    this.timeout(35000);
    request(server)
      .post('/friends')
      .expect(200, done);
  });

});
