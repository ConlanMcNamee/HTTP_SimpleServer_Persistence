var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('server post', function() {
	it('should post the changes ', function(done) {
		chai.request('http://localhost:3000')
		.post('/andrew')
		.send({"username":"xyz","password":"buttz"})
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.eql('{"Success": "true"}');
			done();
		});
	});
});
describe('server get', function() {
	it('get the file located at /andrew', function(done) {
		chai.request('http://localhost:3000')
		.get('/andrew')
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.eql('{"username":"xyz","password":"buttz"}')
			done();
		});
	});
});

describe('server put', function() {
	it('should do something', function(done) {
		chai.request('http://localhost:3000')
		.put('/andrew')
		.send({"password":"seymour butts"})
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.eql('{"Success": "true"}');
			done();
		});
	});
});
describe('server delete', function() {
	it('should do something', function(done) {
		chai.request('http://localhost:3000')
		.delete('/andrew')
		.end(function(err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.eql('{"Deletion": "true"}');
			done();
		});
	});
});