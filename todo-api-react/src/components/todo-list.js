import React, { useState, useEffect } from "react";
import Todo from "./todo";

function TodoList({ todos, setTodos, filter, setFilter }) {
  useEffect(() => {
    let url = "http://localhost:3000";

    if (filter === "COMPLETED") {
      url += "/todo/true";
    }
    if (filter === "INCOMPLETED") {
      url += "/todo/false";
    }
    if (filter === "ALL") {
      url += "/todos";
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success complete changed:", data);
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    /* if (filter == "ALL") {
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
    }
    if (filter == "COMPLETED") {
      fetch("http://localhost:3000/todo/true", {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())x
        .then((data) => {
          console.log("Success:", data);
          setTodos(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (filter == "INCOMPLETED") {
      fetch("http://localhost:3000/todo/false", {
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
    }*/
  }, [filter]);
  const filterTodos = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <select className="mt-[20px] " value={filter} onChange={filterTodos}>
        <option value="ALL">ALL</option>
        <option value="COMPLETED">COMPLETED</option>
        <option value="INCOMPLETED">INCOMPLETED</option>
      </select>
      <div className="mt-[20px]">
        <ul>
          {todos.map((todo) => (
            <Todo
              todos={todos}
              key={todo._id}
              todo={todo}
              text={todo.text}
              filter={filter}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
