


                    // CONFIG FOR LIGHTWIRE APPLICATION



"use strict";

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "lightwire_test"
      : process.env.DATABASE_URL || "lightwire";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
// Should be increased to 13 for non-test use in future?
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("LIGHTWIRE Config:");
console.log("SECRET_KEY:", SECRET_KEY);
console.log("PORT:", PORT.toString());
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR);
console.log("Database:", getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
