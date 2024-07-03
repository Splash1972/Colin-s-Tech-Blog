DROP DATABASE IF EXISTS techblog_db;

-- Create the database
CREATE DATABASE techblog_db;

-- Connect to the database
\c techblog_db;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    bloginfo VARCHAR(250) NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the sessions table for express-session
CREATE TABLE sessions (
    sid VARCHAR(255) NOT NULL,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

ALTER TABLE sessions ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
