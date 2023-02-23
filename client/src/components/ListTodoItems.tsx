import React, { Fragment, useEffect, useState } from "react";

const ListTodoItems = () => {
    const [todos, setTodos] = useState([]);

    //delete todo function

    const deleteTodoItem = async (id: string) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/lists/id/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter((todo: any) => todo.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const getTodoItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/lists");
            console.log("get Todos: response:");
            console.log(response);
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTodoItems();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>View</th>
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
                            <td>{todo.name}</td>
                            <td>
                                View Todo
                            </td>
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
