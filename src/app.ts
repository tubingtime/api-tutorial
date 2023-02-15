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
    port: parseInt(process.env.DB_PORT || "5432")
})

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err);
    }
};
connectToDB();


app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.send("hi guy");
});

app.post("/todos", async (req, res) => {
    try {
        const description = req.body.description;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(newTodo);
        res.json(newTodo.rows[0]);
    } catch (err: any) {
        console.error(err.message)
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err: any) {
        console.error(err.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err: any) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const id  = req.params.id;
        const description = req.body.description;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated!");
    } catch (err: any) {
        console.error(err.message);
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (err: any) {
        console.error(err.message);
    }
});

app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port${process.env.API_PORT}`);
});
