


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
    balance,
    open_date,
    account_type)
VALUES (
    1,
    5000,
    '2021-11-20',
    'savings'
),
(
    1,
    10000,
    '2021-11-20',
    'checking'  
),
(
    2,
    15000,
    '2021-11-20',
    'savings'
),
(
    2,
    20000,
    '2021-11-20',
    'checking'  
);

INSERT INTO transactions
(
    acc_recieving_id,
    acc_sending_id,
    amount,
    transaction_date,
    billing_period,
    transaction_type
)
VALUES(
    1,
    2,
    500,
    '2021-11-19',
    11,
    'wire'
),
(
    1,
    2,
    1000,
    '2021-10-14',
    10,
    'ACH'
);
