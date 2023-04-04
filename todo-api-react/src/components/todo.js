import React, { useState, useEffect } from "react";
import Todoform from "./todo-form";

function Todo({ todos, todo, text, setTodos, filter }) {
  const [editValue, setEditValue] = useState(text);
  const [editMode, setEditMode] = useState(false);

  const checkTodos = (id) => {
    const Checkdata = { text: text, status: !todo.status };
    fetch("http://localhost:3000/todo/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Checkdata),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", Checkdata);
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteTodos = (id) => {
    // fetch("http://localhost:3000/todo/" + id + "?status=" + filter,
    fetch("http://localhost:3000/todo/" + id, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success deleted:", data);
        const filteredTodos = todos.filter((todo) => todo._id !== id);
        setTodos(filteredTodos);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const editTodos = () => {
    setEditMode(true);
  };
  const onSubmitEdit = (id) => {
    setEditMode(false);

    const data = { text: editValue, status: todo.status };

    fetch("http://localhost:3000/todo/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    /*  setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: editValue,
          };
        }
        return item;
      })
    );*/
  };
  console.log(todo._id);

  return (
    <div className="flex mt-[2%]">
      {editMode ? (
        <form>
          <input
            className="border-2 border-gray-400 rounded-sm p-1 w-52 mr-2"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              onSubmitEdit(todo._id);
            }}
            type="submit"
            className="border-2 border-green-600 rounded-sm px-2"
          >
            save
          </button>
        </form>
      ) : (
        <div className="flex ">
          <li
            className={`  break-words w-[100px] ${
              todo.status ? "line-through" : ""
            } `}
          >
            {text}
          </li>
          <button
            onClick={() => deleteTodos(todo._id)}
            className="ml-2 border-2 border-red-600 rounded-sm px-2"
          >
            del
          </button>
          <button
            onClick={() => checkTodos(todo._id)}
            className="ml-2 border-2 border-green-600 rounded-sm px-2"
          >
            check
          </button>
          <button
            onClick={editTodos}
            className="ml-2 border-2 border-blue-600 rounded-sm px-2"
          >
            edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Todo;
