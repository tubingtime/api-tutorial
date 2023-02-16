# api-tutorial
Simple API using NodeJS, Express, and PostGres with the help of Typescript and Docker.

For Typescript and Docker Setup I followed this tutorial: https://dev.to/chandrapantachhetri/docker-postgres-node-typescript-setup-47db

For setting up the todo database: https://www.freecodecamp.org/news/learn-the-pern-stack-full-course/

## Installation

Docker Desktop must be installed first: https://www.docker.com/products/docker-desktop/


1. Install dependencies: `npm install`
2. Create a .env with the following and change the password (password is set on first run):
```
API_PORT=5000

DB_HOST='localhost'
DB_USER='postgres'
DB_NAME='todo_db'
DB_PASSWORD='YOUR_PASSWORD_HERE'
DB_PORT=5432
```
3. Run:
    `docker-compose up`

## Useful postgres commands
Connect to local database using postgress command line tool:

`psql -h <ip> -p <port> -U <username> -d <database>`

List all databases: `\l`

Move inside databases: `\c`

Show table in databases: `\dt`


Specification:
```
Node.js API (First Week)

    POST: Create a TodoList
    GET: Get all of the TodoLists
    POST: Create a TodoItem for a specific list
    GET: Get all the TodoItem's in the TodoList
    PUT:    Update a TodoItem and mark it as done
    DELETE: Delete a TodoListItem
    DELETE: Delete a TodoList

Useful tools

    Postman to make local API requests
        https://www.postman.com/

Use the following Node.js packages

    Express
    Optional
        Nodemon
        Sequelize
            I found this useful when starting out but others have not. So let me know how it goes for you

Database

    PostgresSQL
        You will need to find a client that works with your machine
```
  
