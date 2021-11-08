const todoController = require('../controller/todo.controller');

const todosRoutes = (app, router) => {
    // create the TODO
    router.post('/todo', todoController.createTodo);

    // Update TODO
    router.put('/todo/:todoId', todoController.updateTodo);

    // List TODO
    router.get('/todos/:email', todoController.getTodos);

    // delete TODO
    router.delete('/todo/:todoId', todoController.deleteTodo);

    return router;
};

module.exports = todosRoutes;
