import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    //delete todo function

    const deleteTodo = async (id: string) => {
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
        getTodos();
    }, []);

    console.log('todos:' + todos);

    return (
        <Fragment>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Options
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {todos.map((todo: any) => (
                                <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {todo.name}
                                    </a>
                                )}
                            </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>






            <table className="table mt-5 text-center">
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
                                    onClick={() => deleteTodo(todo.id)}
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

export default ListTodos;
