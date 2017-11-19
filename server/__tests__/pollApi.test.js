const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const Poll = require('../models/poll');
let pollId;
let fakeId;

afterAll(async () => {
  await mongoose.connection.collections.polls.drop();
  await mongoose.disconnect();
});

beforeAll((done) => {
  Poll.create([
    {
      owner: "testuser",
      title: "What's your favorite food?",
      options: {
        chicken: 1,
        fish: 0
      },
      uservotes: ["testuser"],
      ipvotes: [],
    },
    {
      owner: "anotheruser",
      title: "What's your favorite sport?",
      options: {
        soccer: 1,
        football: 1
      },
      uservotes: ["anotheruser", "testuser"],
      ipvotes: [],
    },
    {
      owner: "testuser",
      title: "Is this site worth using?",
      options: {
        yes: 0,
        no: 0
      },
      uservotes: [],
      ipvotes: [],
    }
  ], () => done());
});

describe("the polls api", () => {
  test("GET /api/polls", (done) => {
    request
      .get('/api/polls')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty("polls");
        expect(res.body.polls).toBeInstanceOf(Array);
        expect(res.body.polls.length).toBe(3);
        pollId = res.body.polls[0]._id;
        fakeId = pollId.slice(0, -1) + 'a';
        done();
      });
  });

  describe("GET /api/polls/:id", () => {
    test("If the poll exists, it's returned", (done) => {
      request
        .get(`/api/polls/${pollId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty("poll");
          expect(res.body.poll).toHaveProperty("owner");
          expect(res.body.poll).toHaveProperty("title");
          expect(res.body.poll).toHaveProperty("options");
          done();
        });
    });

    test("If the poll doesn't exist, Not Found is returned", (done) => {
      request
        .get(`/api/polls/${fakeId}`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Not found");
          done();
        });
    });
  });

  describe("PUT /api/polls/:id", () => {
    describe("An unauthenticated user can vote once per IP", () => {
      test("the first vote works", (done) => {
        request
          .put(`/api/polls/${pollId}`)
          .send({option: "fish"})
          .expect(200)
          .end((err, res) => {
            expect(res.body).toHaveProperty("poll");
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Update successful");
            done();
          });
      });

      test("the second vote doesn't work", (done) => {
        request
          .put(`/api/polls/${pollId}`)
          .send({option: "fish"})
          .expect(400)
          .end((err, res) => {
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Unauthenticated users can only vote once per ip");
            done();
          });
      });
    });

    describe("An authenticated user can vote on each poll once", () => {

    });
  });

  describe("Delete /api/polls/:id", () => {
    test("unauthenticated users can't delete a poll", (done) => {
      request
        .delete(`/api/polls/${pollId}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toBe('Not Authorized');
          done();
        });
    });
  });

  describe("/api/polls/create", () => {
    test("unauthenticated users can't create a poll", (done) => {
      request
        .post('/api/polls/create')
        .send({title: "test title", options: ["option 1", "option 2"]})
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Not Authorized");
          done();
        })

    });
  });
});