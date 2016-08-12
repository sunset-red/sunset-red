var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../server')();
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('responds to /', function testSlash(done) {
    this.timeout(35000);
    request(server)
      .get('/')
      .expect(200, done)
  });

  it('404 everything else', function testPath(done) {
    this.timeout(35000);
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

});
