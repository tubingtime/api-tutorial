import React, { Fragment, useEffect, useState } from "react";

const ListTodoItems = () => {
    const [todos, setTodos] = useState([]);

    const siteUrl = window.location.search;
    const urlParams = new URLSearchParams(siteUrl);
    const listId = urlParams.get('list_id');

    

    //TODO: sanitize user input
    console.log("params:");
    console.log(listId);
    

    //delete todo function

    const handleCheckBoxChange = async (id: string) => {
        try {
            const markDone = await fetch(`http://localhost:5000/items/id/${id}`, {
                method: "PUT"
            });
            location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodoItem = async (id: string) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/items/id/${id}`, {
                method: "DELETE"
            });
            getTodoItems();
        } catch (err) {
            console.error(err);
        }
    };

    const getTodoItems = async () => {
        try {
            const response = await fetch(`http://localhost:5000/lists/id/${listId}`);
            console.log("get Todos: response:");
            console.log(response);
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err);
        }
    };
    
    //TODO: add hook for Input todo item 
    useEffect(() => {
        getTodoItems();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Completed</th>
                        <th className=" px-5">Description</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}
                    {todos.map((todo: any) => (
                        <tr key={todo.id}>
                            <td><input type="checkbox" checked={todo.completed} onChange={()=> handleCheckBoxChange} /></td>
                            <td>{todo.description}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodoItem(todo.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodoItems;
