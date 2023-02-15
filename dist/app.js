"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB();
app.get("/test", (req, res, next) => {
    res.send("hi guy");
});
// Create new todo list 
// Insert new todo item 
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const description = req.body.description;
        const newTodo = yield pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(newTodo);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.put("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const description = req.body.description;
        const updateTodo = yield pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated!");
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.delete("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    }
    catch (err) {
        console.error(err.message);
    }
}));
app.listen(process.env.API_PORT, () => {
    console.log(`Server is running on port${process.env.API_PORT}`);
});
//# sourceMappingURL=app.js.map