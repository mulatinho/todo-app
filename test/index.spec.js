let supertest = require('supertest');
let expect    = require('chai').expect;
let app       = require('../index.js');

describe("server information", function() {
  before(function () {});

  after(function () {});

  it("server is up and running", function(done) {
    supertest(app.listen())
      .get("/")
      .expect(200)
      .expect(/Todo-App/)
      .end((err, res) => { done(); })
  })
});

describe("login and signup", function() {
  it("login", function(done) {
    supertest(app.listen())
      .get("/sessions/login")
      .expect(200)
      .end((err, res) => { done(); })
  })

  it("signup", function(done) {
    supertest(app.listen())
      .get("/sessions/signup")
      .expect(200)
      .end((err, res) => { done(); })
  })

  it("auth with github", function(done) {
    supertest(app.listen())
      .get("/sessions/github")
      .expect(501)
      .end((err, res) => { done(); })
  })

  it("logout", function(done) {
    supertest(app.listen())
      .get("/sessions/logout")
      .expect(501)
      .end((err, res) => { done(); })
  })
})

describe("tasks", function() {
  it("list tasks", function(done) {
    supertest(app.listen())
      .get("/tasks")
      .expect(200)
      .end((err, res) => { done(); })
  })

  it("tasks with wrong id should return 404", function(done) {
    supertest(app.listen())
      .get("/tasks/UNDEFINEDROUTE")
      .expect(404)
      .end((err, res) => { done(); })
  })

  it("create simple task", function(done) {
    supertest(app.listen())
      .post("/tasks")
      .expect(501)
      .end((err, res) => { done(); })
  })

  it("update a task", function(done) {
    supertest(app.listen())
      .put("/tasks/8cd83417-f125-4ee4-9caf-49b8a3ad9218")
      .expect(501)
      .end((err, res) => { done(); })
  })

  it("delete a task", function(done) {
    supertest(app.listen())
      .delete("/tasks/8cd83417-f125-4ee4-9caf-49b8a3ad9218")
      .expect(501)
      .end((err, res) => { done(); })
  })
});
