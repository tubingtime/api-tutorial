import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import InputTodo from "./components/InputTodo";
import CreateTodoList from "./components/CreateTodoList";
import ListTodos from "./components/ListTodos";
import ListTodoItems from "./components/ListTodoItems";

function App() {
  return (
    <React.Fragment>
      <h2>🌱🌱🌱🌱🌱</h2>
      <div className="container my-5 align-top flex items-center justify-center flex-col">
        <ListTodos />
        <ListTodoItems />
      </div>
      <div className="container my-5">
        <InputTodo />
      </div>
      <div className="container my-5">
        <CreateTodoList />
      </div>
    </React.Fragment>
  );
}

export default App
