const Todo = require('../models/Todo');

const todoController = {
    addTodo: async (req, res) => {
        try {
            const userid = req.user.userId;
            const { text, complete } = req.body;
            if (!text) throw new Error("Text  is required");
            let todo = new Todo({ userid, text, complete });
            await todo.save();
            res.status(201).send(todo);
        } catch (err) {
            console.error(err)
        }
    },
    getAllTodos: async (req, res) => {
        try {
            const userId = req.user.userId;;
            let todos = await Todo.find().where('userid', '==', userId)
                .sort({ createdAt: -1 }) // sort by date in descending order
                res.json(todos);
        } catch (err) {
            console.error(err);
        }
    },
    updateTodo: async (req, res) => {
        try {
            const id = req.params.id;
            let update = await Todo.updateOne({ _id:id},req.body);
            res.json(update);
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req,res) => {
        try{
            const id = req.params.id;
            let remove = await Todo.deleteOne({_id : id});
            if(!remove) return res.status(404).send("No todo with this ID was found.");
            
            res.json(remove);
        }catch(err){
            console.log(err)
        }
    }
}
module.exports =  todoController;