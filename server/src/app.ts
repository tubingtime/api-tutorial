import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


dotenv.config(); //Reads .env file and makes it accessible via process.env

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5433")
})

async function connectToDB(retries: number) {
    try {
        await pool.connect();
        console.log("DB Connection Established!")
    } catch (err) {
        console.error(err);
        if (retries > 0){
            setTimeout(connectToDB, 2000, retries-1);
        }
    }
};
connectToDB(1);
// TODO: were gonna want to only allow unique list names 
async function setupSchema(){
    try {
        let sqlLists: string = `CREATE TABLE IF NOT EXISTS Lists (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );`
        let sqlItems: string = `CREATE TABLE IF NOT EXISTS Items (
            id SERIAL PRIMARY KEY,
            list_id INT NOT NULL,
            description VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (list_id) REFERENCES Lists(id)
        );`
        await pool.query(sqlLists);
        await pool.query(sqlItems);
    } catch (err: any){
        console.error(err.message);
    }
}
setupSchema();


/**
 * Displays a message on the home page.
 * This would be nice as a redirect to the README. Or just return the readme.
 */
app.get("/", async (req, res) => {
    try {
        res.end("Welcome to TODO list API");
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Creates a TodoList.
 */
app.post("/lists", async (req, res) => {
    try {
        const { name } = req.body;
        const newList = await pool.query("INSERT INTO Lists (name) VALUES($1) RETURNING *", [name]);
        res.json(newList.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Creates and adds a TodoItem to a specific list.
 */
app.post("/lists/id/:list_id", async (req, res) => {
    try {
        const { list_id } = req.params;
        const { description } = req.body;
        const newTodoItem = await pool.query("INSERT INTO Items (list_id, description) VALUES($1, $2)", [list_id, description]);
        res.json("Added new TodoItem!");
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Gets all of the TodoLists.
 */
app.get("/lists", async (req, res) => {
    try {
        const lists = await pool.query("SELECT * from lists");
        res.json(lists.rows);
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Get all TodoItems in a TodoList by list_id.
 */
app.get("/lists/id/:list_id", async (req, res) => {
    try {
        const { list_id } = req.params;
        const items = await pool.query("SELECT * FROM items WHERE list_id = $1", [list_id]);
        res.json(items.rows);
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Get all TodoItems in a TodoList by list_name.
 */
app.get("/lists/name/:list_name", async (req, res) => {
    try {
        const { list_name } = req.params;
        const items = await pool.query("SELECT i.id, i.list_id, i.description, i.completed, i.list_id FROM items i JOIN lists l ON i.list_id = l.id WHERE l.name = $1", [list_name]);
        res.json(items.rows);
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Updates a TodoItem and marks it as done.
 */
//TODO: Make this toggle?
app.put("/items/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateItem = await pool.query("UPDATE Items SET completed = true WHERE id = $1", [id]);
        res.json("TodoItem was marked done!");
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Get a TodoItem by item id.
 */
app.get("/items/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const item = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
        res.json(item.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
})

/**
 * Deletes a TodoItem.
 */
app.delete("/items/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodoItem = await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);
        res.json(`TodoItem: ${deleteTodoItem} was deleted!`);
    } catch (err: any) {
        console.log(err.message);
    }
})

/**
 * Deletes a TodoList.
 */
app.delete("/lists/id/:list_id", async (req, res) => {
    try {
        const { list_id } = req.params;
        const deleteTodoItems = await pool.query("DELETE FROM Items where list_id = $1", [list_id]);
        const deleteTodoList = await pool.query("DELETE FROM lists WHERE id = $1", [list_id]);
        res.json("TodoItem was deleted!");
    } catch (err: any) {
        console.log(err.message);
    }
})

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port${process.env.API_PORT}`);
});
