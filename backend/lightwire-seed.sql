


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
