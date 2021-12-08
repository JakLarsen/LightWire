          
          
          
                  // TOKEN TESTING



           // IMPORTS AND SETUP



const jwt = require("jsonwebtoken");
const { createToken } = require("./tokens");
const { SECRET_KEY } = require("../config");



            // TESTS


            
/**
 * createToken()
 */
describe("createToken", function () {
  test("works: not admin", function () {
    const token = createToken({ username: "test", is_admin: false});
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      admin: false,
    });
  });
  test("Works: admin", function () {
    const token = createToken({ username: "test", is_admin: true});
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      admin: true,
    });
  });
  test("Works: default; not admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createToken({ username: "test"});
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      admin: undefined,
    });
  });
});
