// create App function
module.exports = function (app) {
  var todoList = require("../controllers/todoController");

  // todoList Routes

  // get and post request for /todos endpoints
  app.route("/todos").get(todoList.listAllTodos).post(todoList.createNewTodo);

  // put and delete request for /todos endpoints
  app.route("/todo/:id").delete(todoList.deleteTodo).put(todoList.updateTodo);

  app.route("/todo/:status").get(todoList.filterTodos);
};
