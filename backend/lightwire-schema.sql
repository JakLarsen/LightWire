


                    -- TABLE CREATION AND SCHEMA



CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    phone TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    username VARCHAR(25) NOT NULL,
    balance FLOAT NOT NULL DEFAULT 0,
    open_date DATE,
    account_type TEXT NOT NULL,
    interest FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    acc_receiving_id INTEGER
        REFERENCES accounts ON DELETE CASCADE,
    acc_sending_id INTEGER
        REFERENCES accounts ON DELETE CASCADE,
    amount FLOAT NOT NULL DEFAULT 0,
    transaction_date DATE
);

