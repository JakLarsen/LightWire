                    
                    
                    
                    // TESTING - USER MODEL



            // IMPORTS AND SETUP



"use strict";

const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const {User} = require("./user.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



            // TESTS



/**
 * GET /users
 **/
describe("User.getAll()", function () {
    test("Works", async function () {
        const users = await User.getAll();
        expect(users).toEqual(
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
            ]
        );
    });
});