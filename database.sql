/* Database schema */

CREATE DATABASE todo_db;

CREATE TABLE Lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    list_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (list_id) REFERENCES Lists(id)
);


-- add todo item
INSERT INTO Lists (name) VALUES('bucket-list');

-- get all todo lists
SELECT * FROM Lists;

-- get all items from a todo list
SELECT * FROM Lists (name);