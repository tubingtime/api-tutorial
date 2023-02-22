import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import InputTodo from "./components/InputTodo";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <InputTodo />
      </div>
    </React.Fragment>
  );
}

export default App
