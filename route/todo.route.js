const route = require('route');
const todoController = require('../controller/todo.controller');

// create the TODO
route.post('/todo', todoController.createTodo);

// Update TODO
route.put('/todo/:todoId', todoController.updateTodo);

// List TODO
route.get('/todos/:email', todoController.getTodos);

// delete TODO
route.del('/todo/:todoId', todoController.deleteTodo);

