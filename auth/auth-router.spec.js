const db = require('../database/dbConfig.js');
const Jokes = require('../jokes/jokes-model.js');

describe('Authentication Testing', () => {
	beforeEach(async () => {
		await db('users').truncate();
	})

	describe('Register Testing', () => {
        
		test("Register adds user to DB", async () => {
			let users;
			users = await db('users');
			expect(users).toHaveLength(0);
			await Jokes.add({ id: 1, username: "Test 1", password: "test1234" });
			await Jokes.add({ id: 2, username: "Test 2", password: "test1234" });

			users = await db('users');
			expect(users).toHaveLength(2);
		})
	})

	describe('Login Testing', () => {
		test("Login checks DB for a new user", async () => {			
			let user;

			await Jokes.add({ id: 1, username: "Test 1", password: "test1234" });

			user = await db('users');
			user = await Jokes.findById(1);			
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('username');
			expect(user).toHaveProperty('password');
		})
	})
})