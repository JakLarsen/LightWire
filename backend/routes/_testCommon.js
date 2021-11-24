                    
                    
                    
                    // TESTING - COMMON ROUTES FUNCTIONS AND SETUP



            // IMPORTS AND SETUP



"use strict";

const db = require("../db.js");



      // COMMON FUNCTIONS


      
async function commonBeforeAll() {

  await db.query("DELETE FROM users");
  await db.query(
    `INSERT INTO users (
      username, 
      password, 
      first_name, 
      last_name, 
      email, 
      phone, 
      is_admin
    )
    VALUES (
      'testuser',
      '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
      'Test',
      'User',
      'testuser@test.com',
      '123-456-7890',
      FALSE
    ),
    (
      'testadmin',
      '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
      'Test',
      'Admin',
      'testadmin@test.com',
      '123-456-7890',
      TRUE
    );`
  )
};

async function commonBeforeEach() {
  await db.query("BEGIN");
};

async function commonAfterEach() {
  await db.query("ROLLBACK");
};

async function commonAfterAll() {
  await db.end();
};

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
