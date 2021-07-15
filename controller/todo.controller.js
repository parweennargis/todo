const httpStatus = require('http-status');
const UserModel = require('../models/User.model');


async function createTodo(req, res) {
    try {
        // make the validation
        const { name, email } = req.body;
        if (_.isNil(name) || name == null) throw new Error('invalid_request');
        if (_.isNil(email) || email == null) throw new Error('invalid_request');

        // check user should exist in the DB
        const userData = await User.findOne({ email }).lean();
        if (!userData) throw new Error('invalid_email');

        // create the todo data in the DB
        await UserModel.updateOne({ _id: userData._id }, { $addToSet: { todos: [{ name }] } });
        res.send(httpStatus.OK);
    } catch (ex) {
        console.warn(ex.message);
    }
}

async function updateTodo(req, res) {
    try {
        if (!req.params.todoId) throw new Error('invalid_request');

        const todos = await UserModel.findOne({ 'todos._id': req.params.todoId });
        if (!todos) throw new Error('todos_not_found');

        const existingTodo = _.find(todos, { _id: req.params.todoId });
        if (!existingTodo) throw new Error('todo_not_found');

        const newStatus = existingTodo.isCompleted === true ? false : true;

        // update the todo status
        await UserModel.updateOne({ 'todos._id': req.params.todoId }, { $addToSet: { 'todos.$.isCompleted': newStatus } });

        res.send(httpStatus.OK);
    } catch (ex) {
        console.warn(ex.message);
    }
}

async function getTodos(req, res) {
    try {
        if (!req.params.email) throw new Error('invalid_request');

        const user = await UserModel.findOne({ email }, 'todos');
        if (!user) throw new Error('user_not_found');

        res.send({ todos: user.todos });
    } catch (ex) {
        console.warn(ex.message);
    }
}

async function deleteTodo(req, res) {
    try {
        if (!req.params.todoId) throw new Error('invalid_request');

        const user = await UserModel.findOne({ 'todos._id': req.params.todoId }, 'todos');
        if (!user) throw new Error('user_not_found');

        await UserModel.updateOne({ 'todos._id': req.params.todoId }, { $pull: { todos: { _id: req.params.todoId } } });

        res.send(httpStatus.OK);
    } catch (ex) {
        console.warn(ex.message);
    }
}

