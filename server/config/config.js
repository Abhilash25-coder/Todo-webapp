const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDb(){
    try{
    await mongoose.connect(process.env.DB_URI);
    console.log('connected to db');
    }catch (err){
        console.log(err)
    }
}
module.exports = connectToDb;