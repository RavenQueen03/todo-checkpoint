import logo from "../logo.svg";
import "../App.css";
import React, { useState, useEffect } from "react";
import Todoform from "./todo-form";
import TodoList from "./todo-list";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="App">
      <h1 className="text-center mt-[50px] "> My Todo List</h1>
      <div className="ml-[41%] mr-[37%] "> 
     
        <Todoform
          inputValue={inputValue}
          setInputValue={setInputValue}
          todos={todos}
          setTodos={setTodos}
          filter={filter}
          setFilter={setFilter}
        />
        <TodoList todos={todos} setTodos={setTodos} filter={filter}
          setFilter={setFilter}  />
      </div>
    </div>
  );
}

export default App;
