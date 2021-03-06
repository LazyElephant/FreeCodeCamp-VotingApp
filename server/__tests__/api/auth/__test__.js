const app = require('../../../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');

let authCookie;

afterAll(async () => {
  await mongoose.connection.collections.users.drop();
  await mongoose.disconnect();
});

describe("The authentication Api", () => {
  describe("/api/register", () => {
    test("A new user can be created", (done) => {
      request
        .post('/api/register')
        .send({username:"testuser", password:"testpassword"})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe("User created successfully");
          expect(res.body.username).toBe("testuser");
          authCookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });

    test("Usernames must be unique", (done) => {
      request
        .post('/api/register')
        .send({username:"testuser", password:"testpassword"})
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).toBe("User already exists");
          done();
        })
    })
  }); // end /api/register

  describe("/api/logout", () => {
    test("A logged in user can log out", (done) => {
      request
        .get('/api/logout')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe("Logged out");
          done();
        });
    });
  }); // end /api/logout

  describe("/api/login", () => {
    test("A user can log in", (done) => {
      request
        .post('/api/login')
        .send({username: "testuser", password: "testpassword"})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe("Logged in");
          done();
        });
    });

    test("A user must register before being able to log in", (done) => {
      request
        .post('/api/login')
        .send({username: 'nonexistentuser', password: 'nonexistentpw'})
        .expect('Content-Type', /json/)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).toBe("Bad credentials");
          done();
        });
    });
  }); // end /api/login
})