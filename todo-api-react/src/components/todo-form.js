import React from "react";

function Todoform({
  inputValue,
  setInputValue,
  setTodos,
  todos,
  filter,
  setFilter,
}) {
  const InputValueHandler = (e) => {
    setInputValue(e.target.value);
  };
  const OnSubmit = (e) => {
    e.preventDefault();

    const data = { text: inputValue, status: false };

    fetch("http://localhost:3000/todos", {
      method: "POST", // or 'PUT'
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

    console.log(inputValue);
    setInputValue("");
  };
  

  console.log(todos);
  return (
    <div className="mt-[70px]">
      <input
        className=" border-2 border-black "
        type="text"
        value={inputValue}
        onChange={InputValueHandler}
        placeholder="Type here"
      />
      <button
        className="border-2 border-rose-600 ml-[20px]"
        onClick={OnSubmit}
        type="submit"
      >
        {" "}
        submit
      </button>

      
    </div>
  );
}

export default Todoform;
