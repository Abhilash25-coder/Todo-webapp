const express = require('express');
const app = express();
require("dotenv").config();
const connectToDb = require('./config/config');
const controller = require('./controllers/authController');
const todoController = require( './controllers/todoController' );
const bodyparser = require('body-parser');
const cors = require('cors');
const router  = require('./routes/authRoutes')

app.use(cors());
app.use(bodyparser .json());

connectToDb();
app.use('/',router);
// app.post('/signup',controller.signup);
// app.post('/login',controller.login);
// app.get('/logout',controller.logout);
// app.post('/addTodo', todoController.addTodo);  // add a new item to the list of


app.listen(process.env.PORT,()=>{
    console.log("server is running")
});