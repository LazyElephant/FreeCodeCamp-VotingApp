const app = require('../../../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const Poll = require('../../../models/poll');
const User = require('../../../models/user');
let poll;
let fakeId;

afterAll(async () => {
  await mongoose.connection.collections.polls.drop();
  await mongoose.connection.collections.users.drop();
  await mongoose.disconnect();
});

beforeAll((done) => {
  const user = new User();
  user.username = "testuser";
  user.hashPassword("testpassword");
  user.save((err, user) => {
    done();
  })
})


beforeAll((done) => {
  Poll.create([
    {
      owner: "testuser",
      title: "What's your favorite food?",
      options: {
        chicken: 1,
        fish: 0
      },
      uservotes: ["anotheruser"],
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
  ], (err, polls) => {
    poll = polls[0];  
    done();
  });
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
        done();
      });
  });

  describe("GET /api/polls/:id", () => {
    test("If the poll exists, it's returned", (done) => {
      request
        .get(`/api/polls/${poll._id}`)
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
        .get(`/api/polls/notAnId`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          expect(res.body).toHaveProperty("message");
          expect(res.body.message).toBe("Not Found");
          done();
        });
    });
  });

  describe("An unauthenticated user", () => {
    describe("can vote once per poll", () => {
      test("the first vote works", (done) => {
        request
          .put(`/api/polls/${poll._id}`)
          .send({option: Object.keys(poll.options)[0]})
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
          .put(`/api/polls/${poll._id}`)
          .send({option: Object.keys(poll.options)[0]})
          .expect(400)
          .end((err, res) => {
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Unauthenticated users can only vote once per ip");
            done();
          });
      });
    });

    test("can't delete a poll", (done) => {
      request
        .delete(`/api/polls/${poll._id}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toBe('Not Authorized');
          done();
        });
    });

    test("can't create a poll", (done) => {
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

  describe("An authenticated user", () => {
    let authCookie;
    beforeAll((done) => {
      request
        .post("/api/login")
        .send({username: 'testuser', password: 'testpassword'})
        .end((err, res) => {
          authCookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });

    describe("can vote once per poll", () => {
      test("the first vote works", (done) => {
        request
          .put(`/api/polls/${poll._id}`)
          .send({option: Object.keys(poll.options)[0]})
          .set("Cookie", [authCookie])
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
          .put(`/api/polls/${poll._id}`)
          .send({option: Object.keys(poll.options)[0]})
          .set("Cookie", [authCookie])          
          .expect(400)
          .end((err, res) => {
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Each user can only vote once");
            done();
          });
      });
    });

    test("Can delete their own poll", (done) => {
      request
      .delete(`/api/polls/${poll._id}`)
      .set("Cookie", [authCookie])  
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Poll deleted");
        done();
      });
    });
    
    test("Can create a new poll", (done) => {
      request
      .post('/api/polls/create')
      .send({title: "test title", options: ["option 1", "option 2"]})
      .set("Cookie", [authCookie])  
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Poll created successfully");

        expect(res.body).toHaveProperty("poll");
        expect(res.body.poll).toHaveProperty("title");
        expect(res.body.poll.title).toBe("test title");
        
        expect(res.body.poll).toHaveProperty("options");
        expect(res.body.poll.options).toHaveProperty("option 1");
        expect(res.body.poll.options["option 1"]).toBe(0);
        expect(res.body.poll.options).toHaveProperty("option 2");
        expect(res.body.poll.options["option 2"]).toBe(0);
        done();
      })
    });
  })
});