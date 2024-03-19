const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const todoController = require('../controllers/todoController');
// middleware that is specific to this router
const authenticateToken = require('./middleware');


router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.use(authenticateToken);
router.get('/logout',controller.logout);
router.post('/addTodo', todoController.addTodo); 
router.get('/getTodo',todoController.getAllTodos); // get all todos for a user
router.put("/updateTodo/:id", todoController.updateTodo);// update a single todo by its id
router.delete("/deleteTodo/:id", todoController.deleteTodo);// delete a single todo by its id
module.exports = router