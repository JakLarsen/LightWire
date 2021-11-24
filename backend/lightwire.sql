                    
                    
                    
                    -- MAIN SQL DRIVER



DROP DATABASE lightwire;
CREATE DATABASE lightwire;
\connect lightwire

\i lightwire-schema.sql
\i lightwire-seed.sql

\echo 'Delete and recreate lightwire_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lightwire_test;
CREATE DATABASE lightwire_test;
\connect lightwire_test

\i lightwire-schema.sql