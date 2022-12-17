import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

// chai.should();
chai.use(chaiHttp)
// var expect = chai.expect;
describe('Test API', () => {
    describe('get-api', () => {
        it('get all data', (done) => {
            chai.request(app)
                .get('/api/v1/companies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');                 
                    
                })
                done();
        })

      
    })

    describe('get-api with ID', () => {
        it('get all data with id', (done) => {
            chai.request(app)
                .get('/api/v1/companies/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('likes');
                    
                })
            done();
        })
    })
    describe('get API of A Users ', () => {
        it('get all Usersdata', (done) => {
                chai.request(app)
                    .get('/api/v1/users')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');                 
                        
                    })
                done();
            })
    })




});

   