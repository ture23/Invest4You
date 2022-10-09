import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
var should = chai.should();

var expect = chai.expect;
chai.use(chaiHttp)






    // testiranje getAllCompanies
    describe('get-api with ID AllCompanies', () => {
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


    // testiranje getAllUsers
    describe('get-api with ID AllUsers', () => {
        it('get all data with id', (done) => {
            chai.request(app)
                .get('/api/v1/users/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('role');
                    
                })
            done();

        })
    })



    //testiranje post metode
    describe('post-api', () => {
        it('post data', (done) => {
            chai.request(app)
                .post('/api/v1/companies')
                .send({
                    name: 'test',
                    likes: 1
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('likes');
                    res.body.should.have.property('_id');
                })
            done();
        })
    })
   

    //testiranje delete metode
    describe('delete-api', () => {
        it('delete data', (done) => {
            chai.request(app)
                .delete('/api/v1/companies/:id')
                .send({
                    name: 'test',
                    likes: 1
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('likes');
                    res.body.should.have.property('_id');
                })
            done();
        })
    })



    // test singUp metode

describe('POST /api/v1/auth/signup', () => {
    it('it should singup user', (done) => {
        let user = {
            name: "test",
            email: "email@com",
            password: "test",
            password2: "test"
    }
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('password2');
                res.body.should.have.property('token');
            })
        done();
})
} )
    

    // test login metode

    describe('POST /api/v1/auth/login', () => {
        it('it should login user', (done) => {
            let user = {
                email: "email@com",
                password: "test"
            }
            chai.request(app)
                .post('/api/v1/users/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('token');
                })
            done();
        })
    })

        
        
