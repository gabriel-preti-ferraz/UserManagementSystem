DROP TABLE IF EXISTS users;

CREATE TYPE user_role AS ENUM ('user', 'admin')

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role default 'user' NOT NULL
);

