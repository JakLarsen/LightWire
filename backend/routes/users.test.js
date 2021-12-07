                    
                    
                    
                    // TESTING - USERS ROUTES



            // IMPORTS AND SETUP



"use strict";

const request = require("supertest");
const db = require("../db.js");
const app = require("../app");
const {User} = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    adminToken
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



            // TESTS



/**
 * GET /users
 **/
describe("GET /users", function () {
    test("Works for admin", async function () {
        const resp = await request(app).get("/users")
            .set('authorization', `Bearer ${adminToken}`)
        expect(resp.body).toEqual({
            users: 
            [
                {
                    username: "testadmin",
                    first_name: 'Test',
                    last_name: "Admin",
                    email: "testadmin@test.com",
                    phone: '123-456-7890',
                },
                {
                    username: "testuser",
                    first_name: 'Test',
                    last_name: "User",
                    email: 'testuser@test.com',
                    phone: '123-456-7890',
                },
            ],
        });
    });

});
