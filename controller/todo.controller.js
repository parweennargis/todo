const _ = require('lodash');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const UserModel = require('../models/User.model');

module.exports = {
    createTodo: async (req, res) => {
        console.log(req.body);
        try {
            // make the validation
            const { name, email } = req.body;
            if (_.isNil(name) || name == null) throw new Error('invalid_request');
            if (_.isNil(email) || email == null) throw new Error('invalid_request');

            // check user should exist in the DB
            let userData = await UserModel.findOne({ email }).lean();
            if (!userData) {
                // create the user
                userData = await UserModel.create({ email });
            }

            // create the todo data in the DB
            await UserModel.updateOne({ _id: userData._id }, { $addToSet: { todos: [{ name }] } });
            return res.send(httpStatus.OK);
            // return res.json({ data: loggedIn });
        } catch (ex) {
            console.warn(ex.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ errors: ex.message });
        }
    },

    updateTodo: async (req, res) => {
        try {
            if (!req.params.todoId) throw new Error('invalid_request');

            const todos = await UserModel.findOne({ 'todos._id': req.params.todoId });
            if (!todos) throw new Error('todos_not_found');

            const existingTodo = _.find(todos.todos, { _id: mongoose.Types.ObjectId(req.params.todoId) });
            if (!existingTodo) throw new Error('todo_not_found');

            const newStatus = existingTodo.isCompleted === true ? false : true;

            // update the todo status
            await UserModel.updateOne({ 'todos._id': req.params.todoId }, { $set: { 'todos.$.isCompleted': newStatus } });

            return res.send(httpStatus.OK);
        } catch (ex) {
            console.warn(ex.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ errors: ex.message });
        }
    },

    getTodos: async (req, res) => {
        try {
            if (!req.params.email) throw new Error('invalid_request');

            const user = await UserModel.findOne({ email: req.params.email }, 'todos');
            if (!user) throw new Error('user_not_found');

            return res.send({ todos: user.todos });
        } catch (ex) {
            console.warn(ex.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ errors: ex.message });
        }
    },

    deleteTodo: async (req, res) => {
        try {
            if (!req.params.todoId) throw new Error('invalid_request');

            const user = await UserModel.findOne({ 'todos._id': req.params.todoId }, 'todos');
            if (!user) throw new Error('user_not_found');

            await UserModel.updateOne({ 'todos._id': req.params.todoId }, { $pull: { todos: { _id: req.params.todoId } } });

            return res.send(httpStatus.OK);
        } catch (ex) {
            console.warn(ex.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ errors: ex.message });
        }
    }
};












