const db = require('../database/dbConfig.js');
const Jokes = require('../jokes/jokes-model.js');
const supertest = require('supertest')
const server = require('../api/server')
const auth = require('./auth-router')

beforeEach(async () => {
	// this function executes and clears out the table before each test
	await db('users').truncate();
  });
  describe('Welcome test', () => {

	  test('welcome route', async () => {
	const res = await supertest(server).get('/')
	  expect(res.status).toBe(200)
	  expect(res.type).toBe('application/json')	  
  });
  test('welcome route two', async () => {
	const res = await supertest(server).get('/')
	  expect(res.status).toBe(200)
	  expect(res.type).toBe('application/json')
	  expect(res.body.message).toMatch("Welcome to the dad API")
  });

  })
  
  describe("Register endpoint test", () => {

	  test('add a test to the database', async () => {
	const res = await supertest(server)
	  .post('/api/auth/register')
	  .send({
		"username": "test",
		"password": "test"
	  })
	expect(res.status).toBe(201)
	expect(res.type).toBe('application/json')
	expect(res.body.username).toBeString()
  });
  test('add a test101 to the database', async () => {
	const res = await supertest(server)
	  .post('/api/auth/register')
	  .send({
		"username": "test101",
		"password": "test101"
	  })
	expect(res.status).toBe(201)
	expect(res.type).toBe('application/json')
	expect(res.body.username).toBeString()
  });
  })
  
  describe("login functionality", () => {
    it("should return status 200", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "101test" });
      expect(res.status).toBe(200);
    });
    it("should return a token", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "101test" });
      expect(res.body.token).toBeTruthy();
    });
    it("should return json", async () => {
      const res = await supertest(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "101test" });
      expect(res.type).toBe("application/json");
    });
  });

  describe('getting Jokes test', () => {
	  test('Making sure to return an array', () => {
	const res = supertest(server)
	  .get('/api/jokes')	  	  
	  expect([res.body]).toBeArray()
  })
  test('Making sure to return an array', () => {
	const res = supertest(server)
	  .get('/api/jokes')	  	  
	  expect(res.status).toBe(200)
	  console.log("res", res)
  })
  })
  