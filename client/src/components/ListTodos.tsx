import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes: Array<String>) {
    return classes.filter(Boolean).join(' ')
}

const ListTodos = () => {
    const [todos, setTodoLists] = useState([]);

    //delete todo function

    const deleteTodoList = async (id: string) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/lists/id/${id}`, {
                method: "DELETE"
            });

            setTodoLists(todos.filter((todo: any) => todo.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const getTodoLists = async () => {
        try {
            const response = await fetch("http://localhost:5000/lists");
            console.log("get Todos: response:");
            console.log(response);
            const jsonData = await response.json();
            setTodoLists(jsonData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTodoLists();
    }, []);

    return (
        <Fragment>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Select A Todo List
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
                                            href={"/?list_id=" + todo.id}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
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
        </Fragment>
    );
};

export default ListTodos;
