const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const TodoSchema = new mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
    complete: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;