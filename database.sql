CREATE DATABASE todo_db;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR (255)
);


-- add todo item
INSERT INTO todo (description) VALUES('hello!');

-- get all todos
SELECT * FROM todo;