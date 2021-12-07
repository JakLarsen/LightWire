


                    //AUTH TESTING



            //IMPORTS AND SETUP



"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
} = require("./auth");
const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", admin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", admin: false }, "wrong");



            // TESTS


/**
 * authenticateJWT()
 */
describe("authenticateJWT", function () {
  test("Works: via header .authorization property", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        admin: false,
      },
    });
  });
  test("Works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
  test("Works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

/**
 * ensureLoggedIn()
 */
describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", admin: false } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });
  test("UnauthorizationError if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

/**
 * ensureAdmin()
 */
describe("ensureAdmin", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", admin: true }} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureAdmin(req, res, next);
  });
  test('UnauthorizationError if not admin', function() {
    expect.assertions(1);
    const req = {};
    const res = {locals: {user: {username: 'test', admin: false}}}
    const next = function(e){
      expect(e instanceof UnauthorizedError).toBeTruthy();
    }
    ensureAdmin(req, res, next);
  });
  test('UnauthorizationError if no user', function(){
    expect.assertions(1);
    const req = {};
    const res = {locals: {}}
    const next = function(e){
      expect(e instanceof UnauthorizedError).toBeTruthy();
    }
    ensureAdmin(req,res,next);
  });
});

/**
 * ensureCorrectUserOrAdmin()
 */
describe("ensureCorrectUserOrAdmin", function () {
  test("Works: admin", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "admin", admin: true } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
  test("Works: same user", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "test", admin: false } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
  test("UnauthorizationError if not same user", function () {
    expect.assertions(1);
    const req = { params: { username: "wrong" } };
    const res = { locals: { user: { username: "test", admin: false } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
  test("UnauthorizationError if no user object", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
});
