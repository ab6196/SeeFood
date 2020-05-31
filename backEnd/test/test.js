const assert = require('chai').assert;
const app = require('../index');
var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;

it("Image should be recognized by vision API and return an array of objects", function(done){
     chai.request('http://127.0.0.1:3001').post('/recognizeImage')
    .end(async function (err, res) {
         expect(res).to.have.status(200);
        done();
    });
}).timeout(5000);