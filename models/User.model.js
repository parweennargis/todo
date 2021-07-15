const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose_basics');

const todoSchema = {
    name: { type: String },
    isCompleted: {
        type: Boolean,
        default: false
    }
}
const userSchema = {
    name: { type: String },
    email: { type: String },
    todos: {
        type: [todoSchema]
    }
}

mongoose.Schema('User', userSchema);