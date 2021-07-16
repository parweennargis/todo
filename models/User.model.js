const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = {
    name: { type: String },
    isCompleted: {
        type: Boolean,
        default: false
    }
}
const userSchema = new Schema({
    email: { type: String },
    todos: {
        type: [todoSchema]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);