


                    -- SEED FILE



-- both test users have the password "password"
INSERT INTO users(
    username, 
    password, 
    first_name, 
    last_name, 
    email, 
    phone, 
    is_admin)
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
);

INSERT INTO accounts(
    user_id,
    username,
    balance,
    open_date,
    account_type,
    interest)
VALUES (
    1,
    'testuser',
    5440.17,
    '2021-11-20',
    'savings',
    0.01
),
(
    1,
    'testuser',
    29344.94,
    '2021-11-20',
    'checking',
    0.01 
),
(
    1,
    'testuser',
    5218.98,
    '2021-11-20',
    'credit',
    0.02  
),
(
    2,
    'testadmin',
    15000,
    '2021-11-20',
    'savings',
    0.02
),
(
    2,
    'testadmin',
    20000,
    '2021-11-20',
    'checking',
    0.01  
);

INSERT INTO transactions
(
    acc_receiving_id,
    acc_sending_id,
    amount,
    transaction_date
)
VALUES(
    1,
    2,
    500,
    '2021-11-19'
),
(
    1,
    2,
    1000,
    '2021-10-14'
);
